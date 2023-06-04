import type Editor from "grapesjs/src/editor";
import type ComponentManager from "grapesjs/src/dom_components";
import ComponentsView from "grapesjs/src/dom_components/view/ComponentsView";
import type ComponentView from "grapesjs/src/dom_components/view/ComponentView";
import type ComponentModel from "grapesjs/src/dom_components/model/Component";
import type { ComponentDefinitionDefined } from "grapesjs/src/dom_components/model/types";

export class BaseComponentView {
  el: string;
  emptyEl: HTMLElement;
  getChildrenSelector?: () => string;

  activeCount: number = 0;
  activeTimeouts: number[] = [];
  changeTimedInterval?: number;

  constructor() {
    this.el = "<div></div>";
    this.emptyEl = this.createElementByHTML(`<div>在此处放入内容</div>`);
  }

  createElementByHTML(html: string): HTMLElement {
    let el = document.createElement("div");

    el.innerHTML = html.trim();
    return el.firstChild as HTMLElement;
  }

  init(view: ComponentView) {
    const { model, el } = view;
    view.listenTo(model.components(), "add remove reset", () => {
      this.onComponentsChange(model);
    });
  }

  onRender(opts: { editor: Editor; model: ComponentModel; el: HTMLElement }): void {
    console.log("onRender");
    const { model, el } = opts;

    const parentEl = this.getChildrenSelector ? el.querySelector(this.getChildrenSelector!())! : el;

    const emptyEl = this.emptyEl.cloneNode(true);
    if (model.components().models.length == 0) {
      let childs = [];
      while (emptyEl.firstChild) {
        childs.push(emptyEl.firstChild);
        parentEl.appendChild(emptyEl.firstChild);
      }
      (parentEl as any).emptyEl = childs;
    } else {
      Array.from((parentEl as any).emptyEl || []).forEach((child) => {
        parentEl.removeChild(child as Node);
      });
      (parentEl as any).emptyEl = undefined;

      model.components().forEach(function (component) {
        parentEl.appendChild(component.view?.el!);
      });
    }
    console.log("onRender", model.getName(), model.getId(), model.components().models.length);
  }

  /**
   * Things to do once inner components of custom code are changed
   */
  // @ts-ignore
  onComponentsChange(model: Component, c?: any, opts: { temporary?: boolean } = {}) {
    this.changeTimedInterval && clearInterval(this.changeTimedInterval);
    this.changeTimedInterval = setTimeout(() => {
      let droppable = true;
      // @ts-ignore
      model.set({ droppable });
      const { view } = model;
      const { el } = view;
      this.onRender({ editor: model.em.Editor, model, el });
      console.log("onComponentsChange", model.getName(), model.getId(), model.components().models.length);
    }, 0);
  }
}

export class BaseComponentModel {
  view: BaseComponentView;
  model: ComponentModel;
  editor: Editor;

  type?: string;
  extend: string;
  defaults: ComponentDefinitionDefined;

  constructor(editor: Editor, view: BaseComponentView) {
    this.view = view;
    this.model = {} as any;
    this.editor = editor;

    this.extend = "tw-elements";
    this.defaults = {};
  }

  registry(components: ComponentManager) {
    const view = this.view;
    const el = view.createElementByHTML(view.el);
    components.addType(this.type!, {
      model: {
        obj: this,
        defaults: this.defaults,
        init() {
          this.obj.init(this as unknown as ComponentModel);
        },
      },
      view: {
        obj: this,
        tagName: el.tagName,
        getChildrenSelector: this.view.getChildrenSelector,
        init() {
          const _view = this as unknown as ComponentView;

          _view.el.innerHTML = el.innerHTML;
          _view.el.className = el.className;
          _view.el.style.cssText = el.style.cssText;

          let attrs: any = _view.model.getAttributes();
          for (const attr of el.attributes) {
            attrs[attr.name] = attr.value;
          }
          delete attrs["style"];
          _view.model.set("style", el.style);
          _view.model.setClass(el.className);
          _view.model.setAttributes(attrs);

          this.obj.view.init(_view);
        },
        onRender(opts: { editor: Editor; model: ComponentModel; el: HTMLElement }) {
          this.obj.view.onRender(opts);
        },
      },
    });
  }

  init(model: ComponentModel) {
    this.model = model;

    const attrs = { ...model.get("attributes") };
    const style = { ...model.get("style-default"), ...model.get("style") };

    for (let prop in style) {
      if (!(prop in attrs)) {
        attrs[prop] = style[prop];
      }
    }

    model.set("attributes", attrs);
    model.set("style", attrs);
    // model.listenTo(model, "change:style", this.handleStyleChange);
    // model.listenTo(model, "change:attributes", this.handleAttributeChange);
  }

  isComponent(el: Element) {
    const { type, model } = this;
    if (!type) {
      return (model as any).isComponent(el);
    }

    (el.tagName || "").toLowerCase() === type;
  }

  handleAttributeChange(m: any, v: any, opts: any) {
    const model = this as unknown as ComponentModel;
    model.setStyle(model.get("attributes"), opts);
  }

  handleStyleChange(m: any, v: any, opts: any) {
    const model = this as unknown as ComponentModel;
    const style = model.getStyle();
    delete style.__p;
    model.set("attributes", style, opts);
  }

  getMjmlAttributes() {
    const { model } = this;
    const attr = model.get("attributes") || {};
    delete attr.style;
    const src = model.get("src");
    if (src) attr.src = src;
    return attr;
  }

  /**
   * This will avoid rendering default attributes
   * @return {Object}
   */
  getAttrToHTML() {
    const { model } = this;
    const attr = { ...model.get("attributes") };
    const style = { ...model.get("style-default") };
    delete attr.style;

    for (let prop in attr) {
      const value = attr[prop];

      if (value && value === style[prop]) {
        delete attr[prop];
      }
    }

    return attr;
  }

  /**
   * Have to change a few things for the MJML's xml (no id, style, class)
   */
  toHTML() {
    const { model } = this;
    const tag = model.get("tagName");
    const voidTag = model.get("void");
    const attr = this.getAttrToHTML();
    let code = "";
    let strAttr = "";

    for (let prop in attr) {
      const val = attr[prop];
      const hasValue = typeof val !== "undefined" && val !== "";
      strAttr += hasValue ? ` ${prop}="${val}"` : "";
    }

    code += `<${tag}${strAttr}${voidTag ? "/" : ""}>` + model.get("content");

    model.components().forEach((model: any) => {
      code += model.toHTML();
    });

    if (!voidTag) {
      code += `</${tag}>`;
    }

    return code;
  }

  isHidden() {
    const { model } = this;
    return model.getStyle().display === "none";
  }

  i18n(name: string): string {
    const { editor } = this;

    return editor.I18n.t(`grapesjs-mjml.components.names.${name}`);
  }

  componentsToQuery(cmps: string | string[]): string {
    const cmpsArr = Array.isArray(cmps) ? cmps : [cmps];
    return cmpsArr.map((cmp) => `[data-gjs-type="${cmp}"]`).join(", ");
  }
}
