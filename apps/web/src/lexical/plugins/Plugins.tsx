import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import dynamic from "next/dynamic";
const FoundationPlugins = dynamic(
  () => import("./FoundationPlugins/FoundationPlugins").then((mod) => mod.default),
  {
    ssr: false,
  }
);

const BehaviorPlugins = dynamic(
  () => import("./BehaviorPlugins/BehaviorPlugins").then((mod) => mod.default),
  {
    ssr: false,
  }
);

const CoreUIPlugins = dynamic(() => import("./UIPlugins/UIPlugins").then((mod) => mod.default), {
  ssr: false,
});
const FeaturePlugins = dynamic(
  () => import("./Features/FeaturePlugins").then((mod) => mod.FeaturePlugins),
  {
    ssr: false,
  }
);

export default function PluginsWrapper({
  noteId,
  viewId,
}: {
  editorId: string;
  noteId: string;
  viewId: string;
}) {
  return (
    <div className="container flex flex-col flex-1 mx-auto relative py-8">
      <HistoryPlugin />
      <CoreUIPlugins />
      <FoundationPlugins noteId={noteId} viewId={viewId} />
      <BehaviorPlugins />
      <FeaturePlugins />
    </div>
  );
}
