<script lang="ts">
  import { default as grapesjs } from "$lib/grapesjs";
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
      log: ["debug", "info", "warning", "error"],
      protectedCss: "",
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

    // The `props` argument will contain only the properties you have declared in `script-props`
    const script = function (props:any) {
      const myLibOpts = {
        prop1: props.myprop1,
        prop2: props.myprop2,
      };
      alert("My lib options: " + JSON.stringify(myLibOpts));
    };

    editor.Components.addType("comp-with-js", {
      model: {
        defaults: {
          script,
          // Define default values for your custom properties
          myprop1: "value1",
          myprop2: "10",
          // Define traits, in order to change your properties
          traits: [
            {
              type: "select",
              name: "myprop1",
              changeProp: true,
              options: [
                { value: "value1", name: "Value 1" },
                { value: "value2", name: "Value 2" },
              ],
            },
            {
              type: "number",
              name: "myprop2",
              changeProp: true,
            },
          ],
          // Define which properties to pass (this will also reset your script on their changes)
          "script-props": ["myprop1", "myprop2"],
          // ...
        },
      },
    });

    editor.Blocks.add("comp-with-js", {
      label: "Custom Code",
      media: `
    <svg viewBox="0 0 24 24">
      <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
    </svg>
  `,
      category: "Extra",
      select: true,
      activate: true,
      content: { type: "comp-with-js",content:"{[ myprop1 ]}" },
    });

    (window as any).editor = editor;
  });
</script>

<div id="gjs" style="height:0px; overflow:hidden">
  <div style="margin:100px 100px 25px; padding:25px; font:caption">
    This is a demo content from _index.html. You can use this template file for development purpose. It won't be stored
    in your git repository
  </div>
</div>
