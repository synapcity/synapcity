"use client";

import { loadPluginByName } from "../pluginLoader";
import SlashCommandPlugin from "../UIPlugins/Toolbar/SlashMenu";
import { CustomDraggablePlugin } from "./Draggable";

const KeyboardMove = loadPluginByName("KeyboardMove", true);
const Markdown = loadPluginByName("Markdown", true);
const Hashtag = loadPluginByName("Hashtag", true);
export default function BehaviorPlugins() {
  return (
    <>
      <SlashCommandPlugin />
      <Markdown />
      <Hashtag />
      <KeyboardMove />
      <CustomDraggablePlugin />
    </>
  );
}
