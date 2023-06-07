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

    const components = model.components();
    if (components.models.length == 1) {
      const model = components.models[0];
      if (model.getName() == "Box" && model.get("content")!.trim() == "") {
        components.remove(components.models[0]);
      }
    }

    const emptyEl = this.emptyEl.cloneNode(true);
    if (model.components().models.length == 0) {
      if ((parentEl as any).emptyEl === undefined) {
        (parentEl as any).emptyEl = [];
        while (emptyEl.firstChild) {
          (parentEl as any).emptyEl.push(emptyEl.firstChild);
          parentEl.appendChild(emptyEl.firstChild);
        }
      }
    } else {
      Array.from((parentEl as any).emptyEl || []).forEach((child) => {
        parentEl.removeChild(child as Node);
      });
      (parentEl as any).emptyEl = undefined;

      let components: string[] = [];
      model.components().forEach(function (component) {
        components.push(component.getName());
        parentEl.appendChild(component.view?.el!);
      });

      console.log("onRender", model.getName(), model.getId(), model.components().models.length, components);
    }
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
  editor: Editor;

  type?: string;
  extend: string;
  defaults: ComponentDefinitionDefined;

  constructor(editor: Editor, view: BaseComponentView) {
    this.view = view;
    this.editor = editor;

    this.extend = "tw-elements";
    this.defaults = {};
  }

  registry(components: ComponentManager) {
    const view = this.view;
    const el = view.createElementByHTML(view.el);
    components.addType(this.type!, {
      isComponent: (el: HTMLElement) => {
        return this.isComponent(el);
      },
      model: {
        obj: this,
        defaults: this.defaults,
        init() {
          this.obj.init(this as any);
        },
        toHTML() {
          return this.obj.toHTML(this as any);
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

          _view.model.set("style-default", _view.model.get("style"));
          _view.model.set("class-default", _view.model.getClasses());

          this.obj.view.init(_view);
        },
        onRender(opts: { editor: Editor; model: ComponentModel; el: HTMLElement }) {
          this.obj.view.onRender(opts);
        },
      },
    });
  }

  init(model: ComponentModel) {
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

  /**
   * Have to change a few things for the MJML's xml (no id, style, class)
   */
  toHTML(model: ComponentModel) {
    const tag = model.getName();
    const voidTag = model.get("void");
    const classes = this.remove({ ...model.getClasses() }, { ...model.get(`class-default`) });
    const attr = this.remove({ ...model.get("attributes") }, { ...model.get(`attributes-default`) });

    let strAttr = "";
    for (let prop in attr) {
      const val = attr[prop];
      const hasValue = typeof val !== "undefined" && val !== "";
      strAttr += hasValue ? ` ${prop}="${val}"` : "";
    }
    let classesAttr = [];
    for (let prop in classes) {
      const val = classes[prop];

      if (typeof val !== "undefined" && val !== "") {
        classesAttr.push(val);
      }
    }
    let strClass = classesAttr.length > 0 ? ` class="${classesAttr.join(" ")}"` : "";

    let code = "";
    code += `<${tag}${strClass}${strAttr}${voidTag ? "/" : ""}>` + model.get("content");

    model.components().forEach((model: any) => {
      code += model.toHTML();
    });

    if (!voidTag) {
      code += `</${tag}>`;
    }

    return code;
  }

  remove(values: any, needRemove: any) {
    for (let prop in values) {
      const value = values[prop];

      if (value && value === needRemove[prop]) {
        delete values[prop];
        console.log("delete default value", prop);
      }
    }

    return values;
  }

  isComponent(el: Element) {
    const { type } = this;
    if (!type) {
      return false;
    }

    const tagName = (el.tagName || "").toLowerCase();
    const nodeName = (el.nodeName || "").toLowerCase();
    // console.log("isComponent:", nodeName, el.nodeType, el.nodeValue?.trim(), tagName, type);

    return tagName === type;
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

  getMjmlAttributes(model: ComponentModel) {
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
  getAttrToHTML(model: ComponentModel) {
    const attr = { ...model.get("attributes") };
    const style = { ...model.get("style-default") };
    delete attr.style;

    for (let prop in attr) {
      const value = attr[prop];

      if (value && value === style[prop]) {
        delete attr[prop];
        console.log("delete attr", prop);
      }
    }

    return attr;
  }

  isHidden(model: ComponentModel) {
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
