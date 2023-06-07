import type { PluginOptions } from "..";
import type ComponentView from "grapesjs/src/dom_components/view/ComponentView";
import type Component from "grapesjs/src/dom_components/model/Component";
import type Trait from "grapesjs/src/trait_manager/model/Trait";
import type Editor from "grapesjs/src/editor";
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

  new Icon(editor, new IconView()).registry(Components);
  new List(editor, new ListView()).registry(Components);
  new ListItem(editor, new ListItemView()).registry(Components);
  new NavBar(editor, new NavBarView()).registry(Components);
  new Dropdown(editor, new DropdownView()).registry(Components);
  new Content(editor, new ContentView()).registry(Components);
  new Container(editor, new ContainerView()).registry(Components);
};
