import { keyCustomCode, type PluginOptions } from ".";
import type { CommandObject, Editor } from "grapesjs";

import type grapesjs from "grapesjs";
import { default as ComponentDrag } from "grapesjs/src/commands/view/ComponentDrag";
import type CodeManagerModule from "grapesjs/src/code_manager";
import type CodeMirrorEditor from "grapesjs/src/code_manager/model/CodeMirrorEditor";
import type Component from "grapesjs/src/dom_components/model/Component";
import { eventDrag } from "grapesjs/src/dom_components/model/Component";

export const commandNameCustomCode = "custom-code:open-modal";

export default (editor: Editor, opts: PluginOptions = {}) => {
  const cmd = new CustomCommand(editor, opts);
  const drag = new DragCommand(editor, opts);

  // Add the custom code command
  editor.Commands.add(commandNameCustomCode, {
    run(editor, sender, opts) {
      return cmd.run(editor, sender, opts!);
    },
    stop(editor, sender, opts) {
      return cmd.stop(editor, sender, opts!);
    },

    ...cmd.commandCustomCode,
  });

  editor.Commands.add("tlb-move", {
    ...drag.move,

    run(editor, sender, opts) {
      return drag.run(editor, sender, opts!);
    },
  });
};

class DragCommand {
  private opts: any;
  private editor: Editor;
  public move: CommandObject<any, {}>;
  public drag: CommandObject<any, {}>;
  constructor(editor: Editor, opts: PluginOptions) {
    this.move = editor.Commands.get("tlb-move")!;
    this.drag = editor.Commands.get("core:component-drag")!;

    this.opts = {
      onStop: this.drag.OnStop,
      onStart: this.drag.onStart,
      setPosition: this.drag.setPosition,
    };
    this.editor = editor;

    editor.Commands.add("core:component-drag", {
      ...this.drag,

      run: (editor, sender, opts) => {
        return this.dragRun(editor, sender, opts!);
      },
      stop: (editor, sender, opts) => {
        return this.dragStop(editor, sender, opts!);
      },
    });

    this.drag.onStart = (event: Event) => {
      return this.onStart(event);
    };
    this.drag.getPosition = () => {
      return this.getPosition();
    };
    this.drag.setPosition = ({ x, y, end, position, width, height }: any) => {
      return this.setPosition({ x, y, end, position, width, height });
    };
  }

  run(editor: Editor, sender: any, opts: Record<string, any>): void {
    const { target, event, mode, dragger = {} } = opts;

    this.opts.em = editor.getModel();
    this.opts.target = target;
    this.opts.isTran = mode == "translate";

    if (event.constructor.name != "DragEvent") {
      this.move.run!(editor, sender, opts);
    } else {
      const em = editor.getModel();
      const event = opts && opts.event;
      const { target } = opts;
      const sel = target || editor.getSelected();
      const selAll = target ? [target] : [...editor.getSelectedAll()];
      const nativeDrag = event && event.type == "dragstart";
      const defComOptions = { preserveSelected: 1 };

      if (!sel || !sel.get("draggable")) {
        return em.logWarning("The element is not draggable");
      }

      const hideTlb = () => em.stopDefault(defComOptions);
      selAll.forEach((sel) => sel.trigger("disable"));

      // Without setTimeout the ghost image disappears
      nativeDrag ? setTimeout(hideTlb, 0) : hideTlb();

      const onStart = (data: any) => {
        em.trigger(`${eventDrag}:start`, data);
      };
      const onDrag = (data: any) => {
        em.trigger(eventDrag, data);
      };
      const onEnd = (e: any, opts: any, data: any) => {
        selAll.forEach((sel) => sel.set("status", "selected"));
        editor.select(selAll);
        sel.emitUpdate();
        em.trigger(`${eventDrag}:end`, data);

        // Defer selectComponent in order to prevent canvas "freeze" #2692
        setTimeout(() => em.runDefault(defComOptions));

        // Dirty patch to prevent parent selection on drop
        em.set("_cmpDrag", 1);
      };

      opts = {
        guidesInfo: 1,
        mode: "translate",
        target: sel,
        onStart,
        onDrag,
        onEnd,
        event,
      };

      editor.runCommand("core:component-drag", opts);
    }
  }

  dragRun(editor: Editor, sender: any, opts: Record<string, any>): void {
    const { Canvas } = editor;
    const { target, event, mode, dragger = {} } = opts;

    const { left, top, width, height } = Canvas.offset(target.getEl());
    const { x, y } = Canvas.getMouseRelativeCanvas(event, undefined);

    let margeMode = "tl";
    if (y - top > height / 2) {
      margeMode = "br";
    }

    this.opts = {
      ...this.opts,

      em: editor.getModel(),
      target: target,
      canvas: Canvas,
      isTran: mode == "translate",
      margeMode: margeMode,
    };

    this.drag.run!(editor, sender, { ...opts, mode: "translate" });
  }

  dragStop(editor: Editor, sender: any, opts: Record<string, any>) {
    this.drag.stop!(editor, sender, { ...opts, mode: "translate" });
  }

  onStart(event: Event) {
    this.opts.onStart.bind(this.drag.dragger, event);
  }

  setTranslate(transform: string, axis: string, value: string) {
    const fn = `translate${axis.toUpperCase()}(`;
    const val = `${fn}${value})`;
    let result = (transform || "")
      .split(" ")
      .map((item) => {
        const itemStr = item.trim();
        if (itemStr.indexOf(fn) === 0) item = val;
        return item;
      })
      .join(" ");
    if (result.indexOf(fn) < 0) result += ` ${val}`;

    return result;
  }

  getPosition() {
    const { target, margeMode } = this.opts;

    const unit = "px";
    const styles = target.getStyle();
    const computedStyles = window.getComputedStyle(target.getEl());

    let x = "0px";
    let y = "0px";
    switch (margeMode) {
      case "tl": {
        x = styles["margin-left"] || computedStyles.marginLeft || "0px";
        y = styles["margin-top"] || computedStyles.marginTop || "0px";
        break;
      }
      case "br": {
        x = styles["margin-right"] || computedStyles.marginLeft || "0px";
        y = styles["margin-bottom"] || computedStyles.marginTop || "0px";
        break;
      }
    }

    if (`${parseFloat(y)}${unit}` == y) {
      y = `${parseFloat(y)}${unit}`;
    } else {
      y = "0px";
    }
    if (`${parseFloat(x)}${unit}` == x) {
      x = `${parseFloat(x)}${unit}`;
    } else {
      x = "0px";
    }

    return {
      x: parseFloat(x || "0"),
      y: parseFloat(y || "0"),
    };
  }

  setPosition({ x, y, end, position, width, height }: any) {
    // @ts-ignore
    const { target, margeMode, em }: { target: Component; isTran: boolean } = this.opts;
    const unit = "px";
    const en = !end ? 1 : ""; // this will trigger the final change
    const left = `${x}${unit}`;
    const top = `${y}${unit}`;
    let styleUp = {};

    let transform = target.getStyle()["transform"] || "";
    // @ts-ignore
    transform = this.setTranslate(transform, "x", left);
    // @ts-ignore
    transform = this.setTranslate(transform, "y", top);
    styleUp = { transform, en };
    let marginY = `${y}${unit}`;
    switch (margeMode) {
      case "tl": {
        styleUp = {
          "margin-left": `${x}${unit}`,
          "margin-top": `${y}${unit}`,
        };
        break;
      }
      case "br": {
        const pos = (this.drag as any).dragger.startPosition;

        const xPos = x - pos.x;
        const yPos = y - pos.y;

        styleUp = {
          "margin-right": `${pos.x + -xPos}${unit}`,
          "margin-bottom": `${pos.y + yPos}${unit}`,
        };
        break;
      }
    }

    target.addStyle(styleUp, { avoidStore: !end });

    console.log("setPosition", styleUp);

    // Update StyleManager properties
    em.getSelected() && Object.keys(styleUp).forEach((i: any) => em.trigger(`update:component:style:${i}`));

    this.showElementOffset(target.getEl()!, { view: target.view });
  }
  /**
   * Show element offset viewer
   * @param {HTMLElement}  el
   * @param {Object} pos
   */
  showElementOffset(el: HTMLElement, opts: any = {}) {
    const pos = this.opts.canvas.getElementPos(el);

    const toolsEl = this.toggleToolsEl(true, opts.view);
    const { style } = toolsEl;
    const frameOff = this.opts.canvas.canvasRectOffset(el, pos);
    const topOff = frameOff.top;
    const leftOff = frameOff.left;

    const unit = "px";
    style.top = topOff + unit;
    style.left = leftOff + unit;
    style.width = pos.width + unit;
    style.height = pos.height + unit;

    this._trgToolUp("local", {
      component: this.opts.target,
      el: toolsEl,
      top: topOff,
      left: leftOff,
      width: pos.width,
      height: pos.height,
    });

    var { marginLeft, marginRight, marginTop, marginBottom } = window.getComputedStyle(el);
    console.log("showElementOffset", pos, marginTop, marginLeft, marginBottom, marginRight);
    this.editor.runCommand("show-offset", {
      el,
      elPos: pos,
      view: opts.view,
      force: 1,
      top: 0,
      left: 0,
    });
  }

  _trgToolUp(type: string, opts = {}) {
    this.opts.em.trigger("canvas:tools:update", {
      type,
      ...opts,
    });
  }

  toggleToolsEl(on: boolean, view: any, opts: any = {}) {
    const el = opts.el || this.opts.canvas.getToolsEl(view);
    el && (el.style.display = on ? "" : "none");
    return el || {};
  }
}

class CustomCommand {
  keyCustomCode = keyCustomCode;

  editor: Editor;
  modalTitle: string;
  buttonLabel: string;
  codeViewer: CodeMirrorEditor | undefined;
  codeViewOptions: Record<string, any> | undefined;
  commandCustomCode: Record<string, any> | undefined;

  target: any;

  constructor(editor: Editor, opts: PluginOptions = {}) {
    const { modalTitle, codeViewOptions, commandCustomCode, buttonLabel } = opts;

    this.editor = editor;
    this.modalTitle = modalTitle!;
    this.buttonLabel = buttonLabel!;
    this.codeViewOptions = codeViewOptions;
    this.commandCustomCode = commandCustomCode;
  }

  run(editor: Editor, s: any, opts: Record<string, any>): void {
    const target = opts.target || editor.getSelected();
    this.target = target;

    if (target?.get("editable")) {
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
    const code = target.get(keyCustomCode) || "";
    const content = this.getContent();
    this.editor.Modal.open({ title, content }).onceClose(() => this.editor.stopCommand(commandNameCustomCode));
    this.getCodeViewer().setContent(code);
  }

  /**
   * Custom pre-content. Can be a simple string or an HTMLElement
   */
  getPreContent(): string | HTMLElement | undefined {
    return;
  }

  /**
   * Custom post-content. Can be a simple string or an HTMLElement
   */
  getPostContent(): string | HTMLElement | undefined {
    return;
  }

  /**
   * Get all the content for the custom code
   * @return {HTMLElement}
   */
  getContent() {
    const codeViewer = this.getCodeViewer();
    const content = document.createElement("div");
    const pfx = this.editor.getConfig("stylePrefix");
    content.className = `${pfx}custom-code`;
    this.appendToContent(content, this.getPreContent());
    content.appendChild(codeViewer.getElement()!);
    this.appendToContent(content, this.getPostContent());
    this.appendToContent(content, this.getContentActions());
    codeViewer.refresh();
    setTimeout(() => codeViewer.focus(), 0);

    return content;
  }

  /**
   * Get the actions content. Can be a simple string or an HTMLElement
   * @return {HTMLElement|String}
   */
  getContentActions() {
    const div = document.createElement("div");
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    const pfx = this.editor.getConfig("stylePrefix");
    btn.innerHTML = this.buttonLabel;
    btn.className = `${pfx}btn-prim ${pfx}btn-import__custom-code`;
    btn.onclick = () => this.handleSave();

    const defaultCode = `
    <script>
      export let name = 'world';
      export let count = 0;
    </script>

    <h1 on:click={()=>{count++}}>Hello {name} - {count}!</h1>`;

    const exampleBtn = document.createElement("button");
    exampleBtn.setAttribute("type", "button");
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
  getCodeViewer(): CodeMirrorEditor {
    if (!this.codeViewer) {
      this.codeViewer = this.editor.CodeManager.createViewer({
        codeName: "htmlmixed",
        theme: "hopscotch",
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
      target.insertAdjacentHTML("beforeend", content);
    }
  }
}
