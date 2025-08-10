import type { FieldDefinitionMap } from "@/types/form";

export const getInboxFieldMap = (type: string): FieldDefinitionMap => {
  return {
    type: {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "Text", value: "text" },
        { label: "Link", value: "link" },
        { label: "File", value: "file" },
        { label: "Image", value: "image" },
        { label: "Snippet", value: "snippet" },
      ],
      meta: { required: true },
    },
    content: {
      name: "content",
      label: type === "link" ? "url" : "text",
      type: "text",
      meta: { required: true },
    },
    // processed: {
    // 	name: "processed",
    // 	label: "Marked as Done",
    // 	type: "text",
    // },
  };
};
