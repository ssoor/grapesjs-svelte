import type { PluginOptions } from '..';

import type { Editor } from 'grapesjs';
import { typeCustomCode } from '../components';
import { BasicButton } from './button';
import  { default as $ } from 'grapesjs/src/utils/cash-dom';
import type Component from 'grapesjs/src/dom_components/model/Component';

export default (editor: Editor, { blockCustomCode }: PluginOptions = {}) => {
  const { Blocks } = editor;

  const baseDef = {
    media: `
            <svg viewBox="0 0 24 24">
              <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
            </svg>
          `,
    category: 'Extra',
  }

  const add = (def:typeof BasicButton) => {
    Blocks.add(def.id, {
      ...baseDef,
      ...def,
      content: {
        type: typeCustomCode,
        "custom-code-plugin__code": def.content,
      }
    });
  }

  add(BasicButton);

  blockCustomCode && Blocks.add(typeCustomCode, {
    label: 'Custom Code',
    media: `
      <svg viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
      </svg>
    `,
    category: 'Extra',
    select: true,
    activate: true,
    content: { type: typeCustomCode, "custom-code-plugin__code": "hello !!!" },
    ...blockCustomCode
  });

  Blocks.add("class", {
    label: 'Class Code',
    media: `
      <svg viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
      </svg>
    `,
    category: 'Class',
    content: { type: "class", "class": "inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" },
  });
  


  function getContentByData(dt: DataTransfer) {
    const em = editor.getModel();
    const types = dt && dt.types;
    const files = (dt && dt.files) || [];
    const dragContent = em.get('dragContent');
    let content:any = dt && dt.getData('text');

    if (files.length) {
      content = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const type = file.type.split('/')[0];

        if (type == 'image') {
          content.push({
            type,
            file,
            attributes: { alt: file.name },
          });
        }
      }
    } else if (dragContent) {
      content = dragContent;
    } else if (types.indexOf( 'text/html') >= 0) {
      content = dt && dt.getData('text/html').replace(/<\/?meta[^>]*>/g, '');
    } else if (types.indexOf( 'text/uri-list') >= 0) {
      content = {
        type: 'link',
        attributes: { href: content },
        content: content,
      };
    } else if (types.indexOf( 'text/json') >= 0) {
      const json = dt && dt.getData('text/json');
      json && (content = JSON.parse(json));
    } else if (types.length === 1 && types[0] === 'text/plain') {
      // Avoid dropping non-selectable and non-editable text nodes inside the editor
      content = `<div>${content}</div>`;
    }

    const result = { content };

    return result;
  }

  editor.on("canvas:dragend", (ev: DragEvent) => {
    if (ev.type != "drop") {
      return
    }
    const target:Component  = $(ev.target!).data("model");
    const content = getContentByData(ev.dataTransfer!);

    // target.addClass(content.content.class);

    let addClass = content.content.class;
    if (typeof addClass == "string") {
      addClass = addClass.replace(/\s+/g," ").split(" ")
    }
    (ev.target as HTMLElement).classList.add(...addClass);

    console.log("canvas:dragend", ev,content)
  });
}
