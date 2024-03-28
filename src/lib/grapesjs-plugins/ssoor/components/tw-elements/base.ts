import type Editor from "$lib/grapesjs/src/editor";
import type ComponentManager from "$lib/grapesjs/src/dom_components";
import ComponentsView from "$lib/grapesjs/src/dom_components/view/ComponentsView";
import type ComponentView from "$lib/grapesjs/src/dom_components/view/ComponentView";
import type ComponentModel from "$lib/grapesjs/src/dom_components/model/Component";
import type { ComponentDefinitionDefined } from "$lib/grapesjs/src/dom_components/model/types";

export class BaseComponentView {
  el: string;
  emptyEl: HTMLElement;
  getChildrenSelector?: () => string;

  activeCount: number = 0;
  activeTimeouts: number[] = [];
  changeTimedInterval?: number;

  events() {
    return {};
  }

  constructor() {
    this.el = `<div></div>`;
    this.emptyEl = this.createElementByHTML(`<div>在此处放入内容</div>`);
  }

  createElementByHTML(html: string): HTMLElement {
    let el = document.createElement("div");

    el.innerHTML = html.trim();
    return el.firstChild as HTMLElement;
  }

  _createElement(): Node {
    return this.createElementByHTML(this.el);
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
    const templateEl = view.createElementByHTML(view.el);
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
        tagName: templateEl?.tagName!,
        getChildrenSelector: this.view.getChildrenSelector,
        init() {
          const _view = this as unknown as ComponentView;

          let attrs: any = _view.model.getAttributes();
          for (const attr of templateEl.attributes) {
            attrs[attr.name] = attr.value;
          }

          const styles: any = _view.model.getStyle();
          const classes: any = _view.model.getClasses();

          delete attrs["style"];
          _view.model.setAttributes(attrs);

          _view.model.setStyle(templateEl.style.cssText as any);
          _view.model.setClass(templateEl.className);

          _view.model.set("style-default", _view.model.getStyle());
          _view.model.set("class-default", _view.model.getClasses());

          _view.model.setStyle({ ..._view.model.getStyle(), ...styles });
          _view.model.setClass([..._view.model.getClasses(), ...classes]);

          this.obj.view.init(_view);
        },
        events() {
          return this.obj.view.events();
        },
        onRender(opts: { editor: Editor; model: ComponentModel; el: HTMLElement }) {
          this.obj.view.onRender(opts);
        },
        _createElement(): Node {
          return this.obj.view._createElement();
        },
      },
    });
  }

  init(model: ComponentModel) {
    const attrs = { ...model.get("attributes") };
    const style = { ...model.get("style-default"), ...model.get("style") };

    // for (let prop in style) {
    //   if (!(prop in attrs)) {
    //     attrs[prop] = style[prop];
    //   }
    // }

    model.set("style", style);
    model.set("attributes", attrs);
    // model.listenTo(model, "change:style", this.handleStyleChange);
    // model.listenTo(model, "change:attributes", this.handleAttributeChange);
  }

  /**
   * Have to change a few things for the MJML's xml (no id, style, class)
   */
  toHTML(model: ComponentModel) {
    const tag = model.getName();
    const voidTag = model.get("void");
    const attr = this.remove({ ...model.get("attributes") }, { ...model.get(`attributes-default`) });

    delete attr["class"];
    let items = [];
    const classes = this.remove({ ...model.getClasses() }, { ...model.get(`class-default`) });
    for (let prop in classes) {
      const val = classes[prop];

      if (typeof val !== "undefined" && val !== "") {
        items.push(val);
      }
    }
    attr["class"] = items.join(" ");

    delete attr["style"];
    let dicts: any = {};
    const styles = this.remove({ ...model.getStyle() }, { ...model.get(`style-default`) });
    for (let prop in styles) {
      const val = styles[prop];

      if (typeof val !== "undefined" && val !== "") {
        dicts[prop] = val;
      }
    }
    attr["style"] = dicts;

    let strAttr = "";
    for (let prop in attr) {
      const val = attr[prop];
      const hasValue = typeof val !== "undefined" && val !== "";
      strAttr += hasValue ? ` ${prop}="${val}"` : "";
    }

    let code = "";
    code += `<${tag}${strAttr}${voidTag ? "/" : ""}>` + model.get("content");

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
        console.log("delete default value", prop, value);
      }
    }

    return values;
  }

  isComponent(el: Element): any {
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
