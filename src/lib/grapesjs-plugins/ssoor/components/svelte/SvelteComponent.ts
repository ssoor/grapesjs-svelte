import { keyCustomCode, type PluginOptions } from '../..';
import type Component from 'grapesjs/src/dom_components/model/Component';
import { commandNameCustomCode } from '../../commands';
import Bundler from './Bundler';

export let packagesUrl = 'http://localhost:5173';//'https://unpkg.com';
export let svelteUrl = `${packagesUrl}/svelte`;

export class CustomComponent {
  opts: PluginOptions;
  model: Component;

  bundler: Bundler;

  constructor(model: Component, opts: PluginOptions) {
    this.opts = opts;
    this.model = model;

    this.bundler = new Bundler({
      packagesUrl,
      svelteUrl,
      onstatus: (message?: string) => {
        console.log("bundler.build", message)
        // if (message) {
        //   // show bundler status, but only after time has elapsed, to
        //   // prevent the banner flickering
        //   if (!status_visible && !status_timeout) {
        //     status_timeout = setTimeout(() => {
        //       status_visible = true;
        //     }, 400);
        //   }
        // } else {
        //   clearTimeout(status_timeout);
        //   status_visible = false;
        //   status_timeout = null;
        // }

        // status = message;
      }
    });

  }

  /**
   * Initilize the component
   */
  init() {
    const { model, opts } = this;

    model.on(`change:${keyCustomCode}`, () => this.onCustomCodeChange());
    const initialCode = model.get(keyCustomCode);
    !model.components().length && model.components(initialCode);
    const toolbar = model.get('toolbar')!;
    const id = 'custom-code';

    // Add the custom code toolbar button if requested and it's not already in
    const { toolbarBtnCustomCode } = opts;
    if (toolbarBtnCustomCode && !toolbar.filter((tlb: any) => tlb.id === id).length) {
      toolbar.unshift({
        id,
        command: commandNameCustomCode,
        label: `<svg viewBox="0 0 24 24">
              <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
            </svg>`,
        ...toolbarBtnCustomCode
      });
    }
  }


  /**
   * Callback to launch on keyCustomCode change
   */
  async onCustomCodeChange() {
    const { model, bundler } = this;

    let code = model.get(keyCustomCode);
    console.log("onCustomCodeChange", code);

    if (!code) {
      return;
      /*
        <script>
          let name = 'world';
          let count = 0;
        </script>

        <h1 on:click={()=>{count++}}>Hello {name} - {count}!</h1>
      */
    }

    const components = [{
      name: 'App',
      type: 'svelte',
      source: code
    }];

    const result = await bundler.bundle(components)

    console.log("bundler.bundle", result);
    model.setTraits([]);
    (result.cached.dom['./App.svelte'].result.vars as Array<any>).map(x => {
      model.addTrait(x.export_name, {});
    });

    model.set('jscode', result.dom.code);
    model.getView()!.onRender({ editor: model.em.getEditor(), model: model, el: model.getView()?.el! });

    // this.components(this.get(keyCustomCode));
  }
}
