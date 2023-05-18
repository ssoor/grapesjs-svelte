import { bind } from "svelte/internal";
import type Component from 'grapesjs/src/dom_components/model/Component';
import type ComponentView from 'grapesjs/src/dom_components/view/ComponentView';
import type Trait from 'grapesjs/src/trait_manager/model/Trait';
import type { Editor } from 'grapesjs';
import { commandNameCustomCode } from "../../commands";

export class CustomComponentView {
  el: HTMLElement;
  view:  ComponentView;
  model: Component;

  activeCount: number = 0;
  activeTimeouts: number[] = [];
  changeTimedInterval?: number;

  constructor(view:  ComponentView) {
    const { model, el, em } = view;

    this.el = el;
    this.view = view;
    this.model = model;

    // model.set(keyCustomCode,defaultCode);
    view.listenTo(em, 'trait:update', (opts: any) => this.onTraitUpdate(opts));
    view.listenTo(model.components(), 'add remove reset', this.onComponentsChange);

    this.onComponentsChange();
  }

  onRender(opts: { editor: Editor; model: Component; el: HTMLElement; }): void {
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
        trait.setTargetValue(value, {});
      })
    })

    console.log("onRender", traits);
  }

  onTraitUpdate({ trait }: { trait: Trait }) {
    let props: Record<string, any> = {};

    props[trait.props().name!] = trait.getValue();

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
