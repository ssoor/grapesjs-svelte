import { keyCustomCode, type PluginOptions } from '.';
import type { Editor } from 'grapesjs';

import type grapesjs from 'grapesjs';
import type CodeManagerModule from 'grapesjs/src/code_manager';
import type CodeMirrorEditor from 'grapesjs/src/code_manager/model/CodeMirrorEditor';
import type Component from 'grapesjs/src/dom_components/model/Component';


export const commandNameCustomCode = 'custom-code:open-modal';


export default (editor: Editor, opts: PluginOptions = {}) => {
  const cmd = new CustomCommand(editor,opts);

  // Add the custom code command
  editor.Commands.add(commandNameCustomCode, {
    run(editor, sender, opts) {
      return cmd.run(editor,sender, opts!);
    },
    stop(editor, sender, opts) {
      return cmd.stop(editor, sender, opts!);
    },

    ...cmd.commandCustomCode,
  });
};

class CustomCommand {
  keyCustomCode = keyCustomCode;
  
  editor:Editor;
  modalTitle:string;
  buttonLabel:string;
  codeViewer:CodeMirrorEditor | undefined;
  codeViewOptions:Record<string, any> | undefined;
  commandCustomCode:Record<string, any> | undefined;

  target:any;

  constructor(editor: Editor, opts: PluginOptions = {}){
    const { modalTitle, codeViewOptions, commandCustomCode,buttonLabel } = opts;

    this.editor = editor;
    this.modalTitle = modalTitle!;
    this.buttonLabel = buttonLabel!;
    this.codeViewOptions = codeViewOptions;
    this.commandCustomCode = commandCustomCode;
  }

  run(editor: Editor, s: any, opts: Record<string, any>): void{
    const target = opts.target || editor.getSelected();
      this.target = target;

      if (target?.get('editable')) {
        this.showCustomCode(target, opts);
      }
  }

  stop(editor: Editor, s: any, opts: Record<string, any>) {
    editor.Modal.close();
  }

  /**
   * Method which tells how to show the custom code
   * @param  {Component} target
   */
  showCustomCode(target: Component, options: any) {
    const title = options.title || this.modalTitle;
    const code = target.get(keyCustomCode) || '';
    const content = this.getContent();
    this.editor.Modal
      .open({ title, content })
      .onceClose(() => this.editor.stopCommand(commandNameCustomCode))
    this.getCodeViewer().setContent(code);
  }

  /**
   * Custom pre-content. Can be a simple string or an HTMLElement
   */
  getPreContent():string|HTMLElement|undefined { return;}

  /**
   * Custom post-content. Can be a simple string or an HTMLElement
   */
  getPostContent():string|HTMLElement|undefined { return;}

  /**
   * Get all the content for the custom code
   * @return {HTMLElement}
   */
  getContent() {
    const codeViewer = this.getCodeViewer();
    const content = document.createElement('div');
    const pfx = this.editor.getConfig('stylePrefix');
    content.className = `${pfx}custom-code`;
    this.appendToContent(content, this.getPreContent());
    content.appendChild(codeViewer.getElement()!);
    this.appendToContent(content, this.getPostContent());
    this.appendToContent(content, this.getContentActions());
    codeViewer.refresh();
    setTimeout(()=> codeViewer.focus(), 0);

    return content;
  }

  /**
   * Get the actions content. Can be a simple string or an HTMLElement
   * @return {HTMLElement|String}
   */
  getContentActions() {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    const pfx = this.editor.getConfig('stylePrefix');
    btn.innerHTML = this.buttonLabel;
    btn.className = `${pfx}btn-prim ${pfx}btn-import__custom-code`;
    btn.onclick = () => this.handleSave();


    const defaultCode = `
    <script>
      export let name = 'world';
      export let count = 0;
    </script>

    <h1 on:click={()=>{count++}}>Hello {name} - {count}!</h1>`

    const exampleBtn = document.createElement('button');
    exampleBtn.setAttribute('type', 'button');
    exampleBtn.innerHTML = "Example";
    exampleBtn.className = `${pfx}btn-prim ${pfx}btn-import__custom-code`;
    exampleBtn.onclick = () => {
      this.getCodeViewer().setContent(defaultCode);
    };

    div.appendChild(exampleBtn);
    div.appendChild(btn);

    return div;
  }

  /**
   * Handle the main save task
   */
  handleSave() {
    const { target } = this;
    const code = this.getCodeViewer().getContent();
    target.set(this.keyCustomCode, code);
    this.editor.Modal.close();
  }

  /**
   * Return the code viewer instance
   * @return {CodeViewer}
   */
  getCodeViewer():CodeMirrorEditor {
    if (!this.codeViewer) {
      this.codeViewer = this.editor.CodeManager.createViewer({
        codeName: 'htmlmixed',
        theme: 'hopscotch',
        readOnly: 0,
        ...this.codeViewOptions,
      });
    }
    
    return this.codeViewer!;
  }


  appendToContent(target: HTMLElement, content?: HTMLElement | string) {
    if (content instanceof HTMLElement) {
        target.appendChild(content);
    } else if (content) {
        target.insertAdjacentHTML('beforeend', content);
    }
  }
}
