// eslint.config.js
import js from "@eslint/js"; // Configuración recomendada de ESLint

export default [
  js.configs.recommended, // Configuración recomendada de ESLint
  {
    rules: {
      // Reglas de formato similares a Prettier
      indent: ["error", 2, { SwitchCase: 1 }], // Indentación de 2 espacios
      "linebreak-style": ["error", "unix"], // Saltos de línea Unix (LF)
      quotes: ["error", "single", { avoidEscape: true }], // Comillas simples
      semi: ["error", "never"], // Sin punto y coma
      "comma-dangle": ["error", "always-multiline"], // Comas al final en objetos/arrays multilínea
      "arrow-parens": ["error", "always"], // Paréntesis en funciones flecha
      "object-curly-spacing": ["error", "always"], // Espacios dentro de llaves
      "array-bracket-spacing": ["error", "never"], // Sin espacios dentro de corchetes
    },
    ignores: ["dist/**"], // Ignorar la carpeta dist
  },
];
