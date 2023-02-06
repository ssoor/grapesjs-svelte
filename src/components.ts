import type grapesjs from 'grapesjs';
import { compile } from 'svelte/compiler';
import { PluginOptions } from '.';
import Bundler from './Bundler';
import { bind } from "svelte/internal";
import { keyCustomCode, commandNameCustomCode, typeCustomCode } from './utils';


export let packagesUrl = 'http://localhost:8080';//'https://unpkg.com';
export let svelteUrl = `${packagesUrl}/svelte`;

export default (editor: grapesjs.Editor, opts: PluginOptions = {}) => {
  const { Components } = editor;
  let timedInterval: NodeJS.Timeout;

  Components.addType('script', {
    view: {
      onRender() {
        const { model, el } = this;
        const isCC = model.closestType(typeCustomCode);
        isCC && (el.innerHTML = '');
      }
    },
  });

  Components.addType(typeCustomCode, {
    model: {
      defaults: {
        name: 'Custom Code',
        editable: true,
        ...opts.propsCustomCode,
      },
      obj: CustomComponent,
      init() {
        this.obj = new CustomComponent(this, opts);

        return this.obj.init();
      },
    },

    view: {
      obj: CustomComponentView,
      events: { dblclick: 'onDblClick' },

      init() {
        this.obj = new CustomComponentView(this);
      },
      onRender(opts: { editor?: grapesjs.Editor; model?: grapesjs.Component; el?: HTMLElement; }) {
        this.obj.onRender(opts);
      },
      onActive() {
        this.obj.onActive();
      },
      onDblClick() {
        this.obj.onDblClick();
      },
    },
  });
}

class CustomComponent {
  opts: PluginOptions;
  model: grapesjs.Component;

  bundler: Bundler;

  constructor(model: grapesjs.Component, opts: PluginOptions) {
    this.opts = opts;
    this.model = model;

    this.bundler = new Bundler({
      packagesUrl,
      svelteUrl,
      onstatus: (message?: string) => {
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
    model.getView().onRender({});

    // this.components(this.get(keyCustomCode));
  }
}

class CustomComponentView implements grapesjs.ComponentViewDefinition, grapesjs.ComponentView {
  el: HTMLElement;
  view: grapesjs.ComponentViewDefinition & grapesjs.ComponentView;
  model: grapesjs.Component;

  activeCount: number = 0;
  activeTimeouts: NodeJS.Timeout[] = [];
  changeTimedInterval?: NodeJS.Timeout;

  constructor(view: grapesjs.ComponentViewDefinition & grapesjs.ComponentView) {
    const { model, el, em } = view;

    this.el = el;
    this.view = view;
    this.model = model;

    // model.set(keyCustomCode,defaultCode);
    view.listenTo(em, 'trait:update', (opts: any) => this.onTraitUpdate(opts));
    view.listenTo(model.components(), 'add remove reset', this.onComponentsChange);

    this.onComponentsChange();
  }

  onRender(opts: { editor?: grapesjs.Editor; model?: grapesjs.Component; el?: HTMLElement; }) {
    const { model, el } = this;
    const jscode = model.get('jscode');

    if (!jscode) {
      el.innerHTML = `<p style='padding: 1em;'>Insert here your custom code...<p>`
      return;
    } else {
      const props = {};
      const evalCode = `${jscode};
        const { el } = this;

        if (this.svelte_component) {
          try {
            this.svelte_component.$destroy();
          } catch (err) {
            console.error(err);
          }
        }

        el.innerHTML = '';
        this.svelte_component = new SvelteComponent.default({
          props,
          target: el,
        });
      `;

      eval(evalCode);
    }

    const traits = model.getTraits().map(trait => {
      bind((this as any).svelte_component, trait.props().name, (value: any) => {
        console.log("bind", trait.props().name, value);
        trait.setTargetValue(value, {  });
      })
    })

    console.log("onRender", traits);
  }

  onTraitUpdate({ trait }: { trait: grapesjs.Trait }) {
    let props: Record<string, any> = {};

    props[trait.props().name] = trait.getValue();

    (this as any).svelte_component.$set(props);

    console.log("trait:update", this, trait, {
      props: trait.props(),
      value: trait.getValue(),
      initValue: trait.getInitValue(),
      targetValue: trait.getTargetValue(),
    });
  }

  /**
   * Things to do once inner components of custom code are changed
   */
  // @ts-ignore
  onComponentsChange() {
    this.changeTimedInterval && clearInterval(this.changeTimedInterval);
    this.changeTimedInterval = setTimeout(() => {
      const { model, el } = this;
      let droppable = false;
      // @ts-ignore
      model.set({ droppable });
    }, 0);
  }

  onActive() {
    const { model, em } = this.view;

    em.get('Commands').run(commandNameCustomCode, { target: model });
  }

  onDblClick() {
    while (this.activeTimeouts.length > 0) {
      clearTimeout(this.activeTimeouts.pop());
    }
    this.activeTimeouts.push(setTimeout(() => { this.activeCount = 0; }, 1111));

    this.activeCount++;
    if (this.activeCount > 1) {
      this.onActive();
      this.activeCount = 0;
    }
  }
}
