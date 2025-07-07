// "use client"

// import { useThemeStore } from "@/stores/themeStore/useThemeStore";
// import { generateSemanticColor } from "@/theme/colors/generate";
// import { applyGlobalColorVars, applyScopedColorVars } from "@/theme/colors/apply";
// import { ThemeScope } from "@/theme/types";
// import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";

// /**
//  * Update primary color globally or for a scoped entity.
//  */
// export const usePrimaryColor = (color: string, isGlobal: boolean, scope: ThemeScope, entityId?: string) => {
//   const { setGlobalPreferences, setPreferences, globalPreferences, scopedPreferences } = useThemeStore()
//   const colorData = generateSemanticColor(color);
//   const { preferences } = resolveThemeMetadata({
//     entityType: scope,
//     entityId,
//     globalPreferences,
//     scopedPreferences
//   })

//   if (isGlobal) {
//     applyGlobalColorVars(colorData, preferences.mode, "primary");
//     setGlobalPreferences({ primary: colorData });
//   } else {
//     const element = 
//     applyScopedColorVars(colorData, preferences.mode, "primary", );
//     setPreferences(entityType, entityId, { primary: colorData });
//   }
// }
