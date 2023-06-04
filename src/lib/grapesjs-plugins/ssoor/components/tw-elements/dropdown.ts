// Specs: https://documentation.mjml.io/#mj-button
import type Editor from "grapesjs/src/editor";
import { BaseComponentView, BaseComponentModel } from "./base";
import type ComponentView from "grapesjs/src/dom_components/view/ComponentView";
import type ComponentModel from "grapesjs/src/dom_components/model/Component";

export const type = "tw-dropdown";

export class DropdownView extends BaseComponentView {
  constructor() {
    super();

    this.el = `<div class="relative"  data-te-dropdown-position="dropstart"></div>`;
    this.emptyEl.innerHTML = `
      <!-- Second dropdown trigger -->
      <a
        class="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
        href="#"
        id="dropdownMenuButton2"
        role="button"
        data-te-dropdown-toggle-ref
        aria-expanded="false">
        <!-- User avatar -->
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
          class="rounded-full"
          style="height: 25px; width: 25px"
          alt=""
          loading="lazy" />
      </a>
      <!-- Second dropdown menu -->
      <ul
        class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton2"
        data-te-dropdown-menu-ref>
        <!-- Second dropdown menu items -->
        <li>
          <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
            href="#"
            data-te-dropdown-item-ref
            >Action</a
          >
        </li>
        <li>
          <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
            href="#"
            data-te-dropdown-item-ref
            >Another action</a
          >
        </li>
        <li>
          <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
            href="#"
            data-te-dropdown-item-ref
            >Something else here</a
          >
        </li>
      </ul>`;
  }
}

export class Dropdown extends BaseComponentModel {
  constructor(editor: Editor, view: BaseComponentView) {
    super(editor, view);

    this.type = type;

    this.defaults = {
      ...this.defaults,

      name: this.i18n(type),
      droppable: false,
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
