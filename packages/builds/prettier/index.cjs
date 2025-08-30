module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  tabWidth: 2,
  useTabs: false,

  jsxSingleQuote: false,
  bracketSameLine: false,

  // Tailwind class sorting (picked up automatically if plugin installed)
  plugins: ["prettier-plugin-tailwindcss"],
};
