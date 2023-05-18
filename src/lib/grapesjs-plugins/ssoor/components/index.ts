import type { PluginOptions } from '..';
import type ComponentView from 'grapesjs/src/dom_components/view/ComponentView';
import type Component from 'grapesjs/src/dom_components/model/Component';
import type Trait from 'grapesjs/src/trait_manager/model/Trait';
import type { Editor } from 'grapesjs';
import  { CustomComponent } from './svelte/SvelteComponent';
import  { CustomComponentView } from './svelte/SvelteComponentView';

export const typeCustomCode = 'custom-code';

export default (editor: Editor, opts: PluginOptions = {}) => {
  const { Components } = editor;
  let timedInterval: number;

  Components.addType('script', {
    view: {
      onRender() {
        const { model, el } = this as unknown as ComponentView;
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
      obj: null as null | CustomComponent,
      init() {
        const model = this as unknown as Component;
        this.obj = new CustomComponent(model, opts);

        return this.obj.init();
      },
    },
    view: {
      obj: null as null | CustomComponentView,
      events: { dblclick: 'onDblClick' },

      init() {
        const model = this as unknown as ComponentView;
        this.obj = new CustomComponentView(model);
      },
      onRender(opts: { editor: Editor; model: Component; el: HTMLElement; }) {
        this.obj!.onRender(opts);
      },
      onActive() {
        this.obj!.onActive();
      },
      onDblClick() {
        this.obj!.onDblClick();
      },
    },
  });
}
