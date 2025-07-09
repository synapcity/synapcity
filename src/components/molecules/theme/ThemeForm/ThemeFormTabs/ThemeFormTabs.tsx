"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/atoms/ui/tabs";
import { IconButton } from "@/components/atoms";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GeneralTab = dynamic(() => import("./Tabs/GeneralTab/GeneralTab").then(mod => mod.GeneralTab), { ssr: false });
const FontsTab = dynamic(() => import("./Tabs/FontsTab/FontsTab").then(mod => mod.FontsTab), { ssr: false });
const ColorsTab = dynamic(() => import("./Tabs/ColorsTab/ColorsTab").then(mod => mod.ColorsTab), { ssr: false });
const PreviewTab = dynamic(() => import("./Tabs/PreviewTab/PreviewTab").then(mod => mod.PreviewTab), { ssr: false });

export function ThemeFormTabs() {
  const [tab, setTab] = useState("general");

  const renderTabContent = () => {
    switch (tab) {
      case "general": return <GeneralTab />;
      case "fonts": return <FontsTab />;
      case "colors": return <ColorsTab />;
      case "preview": return <PreviewTab />;
      default: return null;
    }
  };

  return (
    <Tabs value={tab} onValueChange={setTab} className="size-full space-y-4 flex flex-col flex-1">
      <TabsList className="flex justify-center gap-1 p-1 rounded-md border w-full">
        <TabsTrigger value="general" asChild>
          <IconButton icon="Settings" size="sm" variant="ghost" tooltip="General Settings" aria-label="General Settings" />
        </TabsTrigger>
        <TabsTrigger value="fonts" asChild>
          <IconButton icon="Type" size="sm" variant="ghost" tooltip="Font Settings" aria-label="Font Settings" />
        </TabsTrigger>
        <TabsTrigger value="colors" asChild>
          <IconButton icon="Palette" size="sm" variant="ghost" tooltip="Color Settings" aria-label="Color Settings" />
        </TabsTrigger>
        <TabsTrigger value="preview" asChild>
          <IconButton icon="Eye" size="sm" variant="ghost" tooltip="Preview Theme" aria-label="Preview Theme" />
        </TabsTrigger>
      </TabsList>

      <TabsContent className="flex-1 flex flex-col overflow-hidden" value={tab} forceMount>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto h-5/6"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  );
}
