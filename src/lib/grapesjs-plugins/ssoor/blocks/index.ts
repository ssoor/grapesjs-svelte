import type { PluginOptions } from "..";

import type { Editor, BlockProperties } from "$lib/grapesjs";
import { typeCustomCode } from "../components";
import { BasicButton } from "./button";
import { default as $ } from "$lib/grapesjs/src/utils/cash-dom";
import type Component from "$lib/grapesjs/src/dom_components/model/Component";

export default (editor: Editor, { blockCustomCode }: PluginOptions = {}) => {
  const { Blocks } = editor;

  const baseDef = {
    media: `
            <svg viewBox="0 0 24 24">
              <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
            </svg>
          `,
    category: "Extra",
  };

  const add = (def: any) => {
    Blocks.add(def.id, {
      ...baseDef,
      ...def,
      content: {
        type: typeCustomCode,
        "custom-code-plugin__code": def.content,
      },
    });
  };

  add(BasicButton);

  blockCustomCode &&
    Blocks.add(typeCustomCode, {
      label: "Custom Code",
      media: `
    <svg viewBox="0 0 24 24">
      <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
    </svg>
  `,
      category: "Extra",
      select: true,
      activate: true,
      content: { type: typeCustomCode, "custom-code-plugin__code": "hello !!!" },
      ...blockCustomCode,
    });

  Blocks.add("button", {
    label: "button",
    media: `<h1>button</h1>`,
    category: "Extra",
    content: `<button data-gjs-type="tw-button"
    type="button"
    class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
    <span data-gjs-type="text">Button</span>
  </button>`,
  });
  Blocks.add("container", {
    label: "container",
    media: `<h1>container</h1>`,
    category: "Extra",
    content: { type: "tw-container" },
  });
  Blocks.add("list", {
    label: "list",
    media: `<h1>list</h1>`,
    category: "Extra",
    content: { type: "tw-list" },
  });
  Blocks.add("navbar", {
    label: "navbar",
    media: `<h1>navbar</h1>`,
    category: "Extra",
    content: { type: "tw-navigation_bar" },
  });
  Blocks.add("icon", {
    label: "icon",
    media: `<h1>icon</h1>`,
    category: "Extra",
    content: { type: "tw-icon" },
  });

  Blocks.add("list_item", {
    label: "list_item",
    media: `<h1>list_item</h1>`,
    category: "Extra",
    content: { type: "tw-list-item" },
  });

  Blocks.add("tw-dropdown", {
    label: "dropdown",
    media: `<h1>dropdown</h1>`,
    category: "Extra",
    content: {
      type: "tw-dropdown",
      components: [
        {
          type: "tw-container",
          attributes: { "data-te-dropdown-toggle-ref": true },
          components: [
            {
              type: "tw-icon",
            },
          ],
        },
        {
          type: "tw-container",
          attributes: {
            "data-te-dropdown-menu-ref": true,
            class: "absolute z-[1000] overflow-hidden hidden [&[data-te-dropdown-show]]:block",
          },
          components: [
            {
              content: `<ul
          class="overflow-hidden left-auto right-0 float-left m-0 mt-1 min-w-max list-none rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700">
          <!-- Second dropdown menu items -->
          <li><a
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              href="#"
              data-te-dropdown-item-ref
              >Action</a
            ></li>
          <li><a
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
            ></li>
        </ul>`,
            },
          ],
        },
      ],
    },
  });

  Blocks.add("flex-row", {
    label: "横排",
    media: `<h1>横排</h1>`,
    category: "Class",
    content: { type: "class", class: "flex flex-row" },
  });

  Blocks.add("flex-row2", {
    label: "flex-row2",
    media: `<div>row</div>`,
    category: "Class",
    content: {
      type: "class",
      class:
        "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary",
    },
  });

  const addBlock = (id: string, def: BlockProperties) => {
    editor.Blocks.add(id, {
      select: true,
      category: "Basic",
      ...def,
    });
  };

  addBlock("link-block", {
    label: "Link Block",
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`,
    content: {
      type: "link",
      editable: false,
      droppable: true,
      style: {
        display: "inline-block",
        padding: "5px",
        "min-height": "50px",
        "min-width": "50px",
      },
    },
  });

  addBlock("form", {
    label: "Form",
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`,
    content: {
      type: "form",
      editable: false,
      droppable: true,
      style: {
        padding: "5px",
        "min-height": "50px",
        "min-width": "50px",
      },
    },
  });
  const addClass = (def: { id?: string; label: string; class: string | string[] }) => {
    const id = def.id || def.label;
    if (typeof def.class == "object") {
      def.class = def.class.join(" ");
    }
    def.class = "text-neutral-50 " + def.class;

    Blocks.add(id, {
      ...baseDef,

      media: `<div class='${def.class}'>${def.label}</div>`,
      category: "Class",
      id: "class-" + id.replace(/\s/g, "_"),
      label: def.label,
      content: { type: "class", class: def.class },
    });

    console.log("color", def.label);
  };
  addClass({ label: "Primary", class: "bg-primary" });
  addClass({ label: "secondary", class: "bg-secondary" });
  addClass({ label: "secondary", class: "bg-secondary" });
  addClass({ label: "danger", class: "bg-danger" });
  addClass({ label: "warning", class: "bg-warning" });
  addClass({ label: "warning", class: "bg-warning" });
  addClass({ label: "neutral-50", class: "bg-neutral-50 text-neutral-800" });
  addClass({ label: "neutral-800", class: "bg-neutral-800" });
  addClass({ label: "dark:neutral-900", class: "dark:bg-neutral-900" });

  addBlock("button", {
    label: "Button",
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`,
    content: `<button type="button">Button</button>`,
  });

  addBlock("input", {
    label: "Input",
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`,
    content: `    <div class="relative mb-6" data-te-input-wrapper-init>
    <input
      type="email"
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id="exampleInputEmail2"
      aria-describedby="emailHelp"
      placeholder="Enter email" />
    <label
      for="exampleInputEmail2"
      class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >Email address</label
    >
  </div>`,
  });

  addBlock("text-basic", {
    label: "Text section",
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
    </svg>`,
    content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`,
  });

  function getContentByData(dt: DataTransfer) {
    const em = editor.getModel();
    const types = dt && dt.types;
    const files = (dt && dt.files) || [];
    const dragContent = em.get("dragContent");
    let content: any = dt && dt.getData("text");

    if (files.length) {
      content = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const type = file.type.split("/")[0];

        if (type == "image") {
          content.push({
            type,
            file,
            attributes: { alt: file.name },
          });
        }
      }
    } else if (dragContent) {
      content = dragContent;
    } else if (types.indexOf("text/html") >= 0) {
      content = dt && dt.getData("text/html").replace(/<\/?meta[^>]*>/g, "");
    } else if (types.indexOf("text/uri-list") >= 0) {
      content = {
        type: "link",
        attributes: { href: content },
        content: content,
      };
    } else if (types.indexOf("text/json") >= 0) {
      const json = dt && dt.getData("text/json");
      json && (content = JSON.parse(json));
    } else if (types.length === 1 && types[0] === "text/plain") {
      // Avoid dropping non-selectable and non-editable text nodes inside the editor
      content = `<div>${content}</div>`;
    }

    const result = { content };

    return result;
  }

  const onDropClass = (el: HTMLElement, dataTransfer: DataTransfer) => {
    if (!el || !dataTransfer) {
      return;
    }
    const content = getContentByData(dataTransfer);
    if (content.content.type != "class") {
      return;
    }

    const target: Component = $(el).data("model");

    target.addClass(content.content.class);

    let addClass = content.content.class;
    if (typeof addClass == "string") {
      addClass = addClass.replace(/\s+/g, " ").split(" ");
    }
    // (el as HTMLElement).classList.add(...addClass);

    console.log("onDropClass", el, content);
  };

  editor.on("block:drag:start", (block: any, ev: DragEvent, v3) => {
    console.log("block:drag:start", block, ev, v3);
    onDropClass(editor.getSelected()?.getEl()!, ev.dataTransfer!);
  });

  editor.on("canvas:dragend", (ev: DragEvent) => {
    console.log("canvas:dragend", ev);
    if (ev.type != "drop") {
      return;
    }

    onDropClass(ev.target as HTMLElement, ev.dataTransfer!);
  });
};
