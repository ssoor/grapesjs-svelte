// Specs: https://documentation.mjml.io/#mj-button
import type Editor from "grapesjs/src/editor";
import { BaseComponentView, BaseComponentModel } from "./base";
import type ComponentView from "grapesjs/src/dom_components/view/ComponentView";
import type ComponentModel from "grapesjs/src/dom_components/model/Component";

export const type = "tw-list";

export class ListView extends BaseComponentView {
  constructor() {
    super();

    this.el = `<ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref></ul>`;
    this.emptyEl.innerHTML = `<li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
      <!-- Dashboard link -->
      <a
        class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
        href="#"
        data-te-nav-link-ref
        >Dashboard</a
      >
    </li>
    <!-- Team link -->
    <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
      <a
        class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
        href="#"
        data-te-nav-link-ref
        >Team</a
      >
    </li>
    <!-- Projects link -->
    <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
      <a
        class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
        href="#"
        data-te-nav-link-ref
        >Projects</a
      >
    </li>`;
  }
}

export class List extends BaseComponentModel {
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
      "style-default": {
        "background-color": "#414141",
        "border-radius": "3px",
        "font-size": "13px",
        "font-weight": "400",
        color: "#ffffff",
        "vertical-align": "middle",
        "padding-top": "10px",
        "padding-bottom": "10px",
        "padding-right": "25px",
        "padding-left": "25px",
        align: "center",
      },
      traits: ["href"],
      // 'container-background-color', 'inner-padding'
    };
  }
}
