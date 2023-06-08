// Specs: https://documentation.mjml.io/#mj-button
import type Editor from "grapesjs/src/editor";
import { BaseComponentView, BaseComponentModel } from "./base";
import type ComponentView from "grapesjs/src/dom_components/view/ComponentView";
import type ComponentModel from "grapesjs/src/dom_components/model/Component";

export const type = "tw-list-item";

export class ListItemView extends BaseComponentView {
  constructor() {
    super();

    this.el = `<li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
    <!-- Dashboard link -->
    <a
      class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
      href="#"
      data-te-nav-link-ref
      >Dashboard</a
    >
  </li>`;
    this.emptyEl.innerHTML = `<!-- Dashboard link -->
      <a
        class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
        href="#"
        data-te-nav-link-ref
        >Dashboard</a
      >`;
  }
}

export class ListItem extends BaseComponentModel {
  constructor(editor: Editor, view: BaseComponentView) {
    super(editor, view);

    this.type = type;

    this.defaults = {
      ...this.defaults,

      name: this.i18n(type),
      draggable: this.componentsToQuery(["tw-list"]),
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
}
