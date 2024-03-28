import type { PluginOptions } from "..";
import type ComponentView from "$lib/grapesjs/src/dom_components/view/ComponentView";
import type Component from "$lib/grapesjs/src/dom_components/model/Component";
import type Trait from "$lib/grapesjs/src/trait_manager/model/Trait";
import type Editor from "$lib/grapesjs/src/editor";
import { CustomComponent } from "./svelte/SvelteComponent";
import { CustomComponentView } from "./svelte/SvelteComponentView";
import { BaseComponentModel, BaseComponentView } from "./tw-elements/base";
import { Dropdown, DropdownView } from "./tw-elements/dropdown";
import { List, ListView } from "./tw-elements/list";
import { ListItem, ListItemView } from "./tw-elements/list-item";
import { NavBar, NavBarView } from "./tw-elements/navigation_bar";
import { Icon, IconView } from "./tw-elements/icon";
import { Container, ContainerView } from "./tw-elements/container";
import { Content, ContentView } from "./tw-elements/content";
import { Text, TextView } from "./tw-elements/text";

export const typeCustomCode = "custom-code";

export default (editor: Editor, opts: PluginOptions = {}) => {
  const { Components } = editor;
  let timedInterval: number;

  Components.addType("script", {
    view: {
      onRender() {
        const { model, el } = this as unknown as ComponentView;
        const isCC = model.closestType(typeCustomCode);
        isCC && (el.innerHTML = "");
      },
    },
  });

  Components.addType(typeCustomCode, {
    model: {
      defaults: {
        name: 'Custom Code',
        editable: true,
        ...opts.propsCustomCode,
      },
      obj: null as null | CustomComponent,
      init() {
        const model = this as unknown as Component;
        this.obj = new CustomComponent(model, opts);

        return this.obj.init();
      },
    },
    view: {
      obj: null as null | CustomComponentView,
      events: { dblclick: 'onDblClick' },

      init() {
        const model = this as unknown as ComponentView;
        this.obj = new CustomComponentView(model);
      },
      onRender(opts: { editor: Editor; model: Component; el: HTMLElement; }) {
        this.obj!.onRender(opts);
      },
      onActive() {
        this.obj!.onActive();
      },
      onDblClick() {
        this.obj!.onDblClick();
      },
    },
  });
  
  new Icon(editor, new IconView()).registry(Components);
  new Text(editor, new TextView()).registry(Components);
  new List(editor, new ListView()).registry(Components);
  new ListItem(editor, new ListItemView()).registry(Components);
  new NavBar(editor, new NavBarView()).registry(Components);
  new Dropdown(editor, new DropdownView()).registry(Components);
  new Content(editor, new ContentView()).registry(Components);
  new Container(editor, new ContainerView()).registry(Components);
};
