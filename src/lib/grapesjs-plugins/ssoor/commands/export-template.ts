import type { Editor, PluginOptions } from "grapesjs";
import juice from "juice";

export class ExportTemplate {
  pfx: string;
  containerEl?: HTMLDivElement;
  codeEditorHtml?: any;
  constructor(editor: Editor, opts: Required<PluginOptions>) {
    this.pfx = editor.getConfig().stylePrefix!;
  }
  createCodeViewer(): any {
    // @ts-ignore
    return editor.CodeManager.createViewer({
      codeName: "htmlmixed",
      theme: 'hopscotch',
    });
  }

  createCodeEditor() {
    const el = document.createElement("div");
    const codeEditor = this.createCodeViewer();

    el.style.flex = "1 0 auto";
    el.style.boxSizing = "border-box";
    el.className = `${this.pfx}export-code`;
    el.appendChild(codeEditor.getElement());

    return { codeEditor, el };
  }

  getCodeContainer(): HTMLDivElement {
    let containerEl = this.containerEl as HTMLDivElement;

    if (!containerEl) {
      containerEl = document.createElement("div");
      containerEl.className = `${this.pfx}export-container`;
      containerEl.style.display = "flex";
      containerEl.style.gap = "5px";
      containerEl.style.flexDirection = "column";
      containerEl.style.justifyContent = "space-between";
      this.containerEl = containerEl;
    }

    return containerEl;
  }

  run(editor: Editor, sender: any, opts: any) {
    let { codeEditorHtml } = this as any;
    const container = this.getCodeContainer();

    // Init code viewer if not yet instantiated
    if (!codeEditorHtml) {
      const codeViewer = this.createCodeEditor();
      codeEditorHtml = codeViewer.codeEditor;
      this.codeEditorHtml = codeEditorHtml;

      let labelEl = document.createElement("div");
      labelEl.className = `${this.pfx}export-label`;
      labelEl.innerHTML = "opts.modalLabelExport";
      container.appendChild(labelEl);

      container.appendChild(codeViewer.el);
    }

    editor.Modal.open({
      title: "Code",
      content: container,
    });

    if (codeEditorHtml) {
      const tmpl = `${editor.getHtml()}<style>${editor.getCss()}</style>`;
      codeEditorHtml.setContent(juice(tmpl));
      codeEditorHtml.editor.refresh();
    }
  }
}
