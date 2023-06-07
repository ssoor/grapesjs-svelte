<script lang="ts">
  import { Editor, default as grapesjs } from "grapesjs";
  import { onMount } from "svelte";
  import * as x from "$lib/grapesjs-plugins/ssoor";
  // Initialization for ES Users
  // import { Ripple, Input, initTE } from "tw-elements";

  onMount(() => {
    // initTE({ Ripple, Input });
    const tailwindScript = `<!DOCTYPE html>
      <head>
        <style>
          *[data-gjs-highlightable] {
              outline: unset !important;
          }
        </style>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css" />
      </head>
      <body></body>
      <script src="https://cdn.tailwindcss.com/3.3.0"><\/script>
      <script>
        tailwind.config = {
          darkMode: "class",
          theme: {
            fontFamily: {
              sans: ["Roboto", "sans-serif"],
              body: ["Roboto", "sans-serif"],
              mono: ["ui-monospace", "monospace"],
            },
          },
          corePlugins: {
            preflight: false,
          },
        };
      <\/script>
      <script type="module">
        import * as tw from "/tw-elements/js/tw-elements.es.min.js";

        const te = {
          Animate: tw.Animate,
          Alert: tw.Alert,
          Button: tw.Button,
          ChipsInput: tw.ChipsInput,
          Chip: tw.Chip,
          Dropdown: tw.Dropdown,
          Carousel: tw.Carousel,
          Collapse: tw.Collapse,
          Offcanvas: tw.Offcanvas,
          Modal: tw.Modal,
          Popover: tw.Popover,
          ScrollSpy: tw.ScrollSpy,
          Select: tw.Select,
          Tab: tw.Tab,
          Toast: tw.Toast,
          Tooltip: tw.Tooltip,
          Ripple: tw.Ripple,
          Datepicker: tw.Datepicker,
          Timepicker: tw.Timepicker,
          Sidenav: tw.Sidenav,
          Stepper: tw.Stepper,
          Input: tw.Input,
          Chart: tw.Chart,
        };
        
        window.tw = tw;
        setInterval(() => {
          console.log("initTE");
          tw.initTE(te);
        },1000);
      <\/script>
      </html>`;
    const editor = grapesjs.init({
      height: "100%",
      container: "#gjs",
      showOffsets: true,
      fromElement: true,
      noticeOnUnload: false,
      storageManager: {
        options: {
          local: { key: "gjsProjectNl" },
        },
      },
      selectorManager: {
        componentFirst: true,
        escapeName: (name: string) => name,
      },
      canvas: {
        // styles: ['https://...'],
        // scripts: ['https://cdn.tailwindcss.com'],
        frameContent: tailwindScript,
      },
      plugins: [x.default],
      pluginsOpts: {
        //   'grapesjs-svelte': { /* Test here your options  */ }
      },
    });

    // console.log(editor.Components.getTypes());
    // editor.Components.removeType("textnode");

    (window as any).editor = editor;
  });
</script>

<div id="gjs" style="height:0px; overflow:hidden">
  <div style="margin:100px 100px 25px; padding:25px; font:caption">
    This is a demo content from _index.html. You can use this template file for development purpose. It won't be stored
    in your git repository
  </div>
</div>
