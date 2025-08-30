import { preset, Config } from "@builds/tailwind";

export default {
  presets: [preset],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
} satisfies Config;
