import type { PluginOptions } from "..";

import type { Editor, BlockProperties } from "grapesjs";
import { typeCustomCode } from "../components";
import { BasicButton } from "./button";
import { default as $ } from "grapesjs/src/utils/cash-dom";
import type Component from "grapesjs/src/dom_components/model/Component";

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

  const add = (def: typeof BasicButton) => {
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

  Blocks.add("class", {
    label: "Class Code",
    media: `
      <svg viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
      </svg>
    `,
    category: "Class",
    content: {
      type: "class",
      class:
        "inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]",
    },
  });

  Blocks.add("flex-row", {
    label: "flex-row",
    media: `<div>row</div>`,
    category: "Class",
    content: { type: "class", class: "flex flex-row" },
  });

  Blocks.add("flex-row2", {
    label: "flex-row2",
    media: `<div>row</div>`,
    category: "Class",
    content: { type: "class", class: "pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary" },
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
    content:{
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
