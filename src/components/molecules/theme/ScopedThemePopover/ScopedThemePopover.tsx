// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import dynamic from "next/dynamic";
// import type { ThemeScope } from "@/theme/types";
// import { useTheme } from "@/providers";

// const ThemeForm = dynamic(
//   () =>
//     import("@/components/molecules/theme/ThemeForm/ThemeForm").then(
//       (mod) => mod.ThemeForm
//     ),
//   {
//     ssr: false,
//     loading: () => <div className="p-4 text-sm">Loading theme settings...</div>,
//   }
// );

// const IconButton = dynamic(() => import("@/components/atoms/buttons/IconButton/IconButton").then((mod) => mod.IconButton))
// const PopoverWrapper = dynamic(() => import("@/components/molecules/PopoverWrapper/PopoverWrapper").then((mod) => mod.PopoverWrapper))
// export const ScopedThemePopover = ({
//   scope,
//   entityId,
// }: {
//   scope: ThemeScope;
//   entityId: string;
// }) => {

//   const { updateTheme, updatePreviewTheme } = useTheme()
//   const handleSubmit = (data: any) => {
//     updatePreviewTheme(data)
//     updateTheme()
//   }
//   return (
//     <PopoverWrapper
//       side="bottom"
//       align="end"
//       sideOffset={8}
//       trigger={
//         <IconButton
//           icon="Palette"
//           size="sm"
//           variant="ghost"
//           tooltip="Edit Theme"
//           aria-label="Edit Theme"
//         />
//       }
//       content={
//         <div className="w-full max-h-[calc(100vh-8rem)] overflow-auto p-2">
//           <ThemeForm
//             scope={scope}
//             entityId={entityId}
//             onSubmit={handleSubmit}
//           />
//         </div>
//       }
//     />
//   );
// };


"use client";

import dynamic from "next/dynamic";
import type { ThemeScope } from "@/theme/types";
import { useTheme } from "@/providers";

const IconButton = dynamic(() => import("@/components/atoms/buttons/IconButton/IconButton").then(mod => mod.IconButton));
const PopoverWrapper = dynamic(() => import("@/components/molecules/PopoverWrapper/PopoverWrapper").then(mod => mod.PopoverWrapper));
const ThemeForm = dynamic(() => import("../ThemeForm/ThemePopoverForm/ThemePopoverForm").then(mod => mod.ThemePopoverForm), {
  ssr: false,
  loading: () => <div className="p-4 text-sm">Loading theme settings...</div>,
});

export const ScopedThemePopover = ({
  scope,
  entityId,
}: {
  scope: ThemeScope;
  entityId: string;
}) => {
  const { updateTheme, updatePreviewTheme } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    updatePreviewTheme(data);
    updateTheme();
  };

  return (
    <PopoverWrapper
      side="bottom"
      align="end"
      sideOffset={8}
      trigger={
        <IconButton
          icon="Palette"
          size="sm"
          variant="ghost"
          tooltip="Edit Theme"
          aria-label="Edit Theme"
        />
      }
      content={
        <div className="w-[320px] max-h-[calc(100vh-8rem)] overflow-auto p-2">
          <ThemeForm scope={scope} entityId={entityId} onSubmit={handleSubmit} />
        </div>
      }
    />
  );
};
