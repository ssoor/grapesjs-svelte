// Specs: https://documentation.mjml.io/#mj-button
import type Editor from "grapesjs/src/editor";
import { BaseComponentView, BaseComponentModel } from "./base";
import type ComponentView from "grapesjs/src/dom_components/view/ComponentView";
import type ComponentModel from "grapesjs/src/dom_components/model/Component";

export const type = "tw-text";

export class TextView extends BaseComponentView {
  constructor() {
    super();

    this.el = `<span></span>`;
    this.emptyEl.innerHTML = `TEXT`;
  }

  events() {
    return {
      dblclick: 'onActive',
      input: 'onInput',
    };
  }

}

export class Text extends BaseComponentModel {
  constructor(editor: Editor, view: BaseComponentView) {
    super(editor, view);

    this.type = type;

    this.defaults = {
      ...this.defaults,

      name: this.i18n(type),
      highlightable: false,
      stylable: [
        "width",
        "height",
        "background-color",
        "container-background-color",
        "font-style",
        "font-size",
        "font-weight",
        "font-family",
        "color",
        "text-decoration",
        "align",
        "vertical-align",
        "text-transform",
        "padding",
        "padding-top",
        "padding-left",
        "padding-right",
        "padding-bottom",
        "border-radius",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border",
        "border-width",
        "border-style",
        "border-color",
      ],
      traits: ["href"],
      // 'container-background-color', 'inner-padding'
    };
  }

  isComponent(el: HTMLElement) {
    if (el.nodeType === 3) {
      console.log("2text", el);
      // return true;
      return {
        type: type,
        content: el.textContent+"!!!!!!!!!!!!!1",
      };
    }
  }
}
