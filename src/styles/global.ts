import { createGlobalStyle } from "styled-components";
import { tokens } from "./tokens";

export const GlobalStyle = createGlobalStyle`
/* ─── Reset ─────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── Base ───────────────────────────────────────────── */
html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: ${tokens.fontSize.base};
  line-height: ${tokens.lineHeight.normal};
  color: ${tokens.colors.neutral[800]};
  background-color: ${tokens.colors.surface.page};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.01em;
  line-height: ${tokens.lineHeight.snug};
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
  transition: color ${tokens.transition.fast};
}

input, textarea, select, button {
  font-family: inherit;
  font-size: inherit;
}

button, [role="button"], label[for] {
  cursor: pointer;
}

/* ─── Focus acessível ───────────────────────────────── */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid ${tokens.colors.primary[500]};
  outline-offset: 2px;
  border-radius: 4px;
}

/* ─── Seleção de texto ──────────────────────────────── */
::selection {
  background-color: ${tokens.colors.primary[100]};
  color: ${tokens.colors.primary[900]};
}

/* ─── Scrollbar customizada (webkit) ────────────────── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: ${tokens.colors.neutral[100]};
}

::-webkit-scrollbar-thumb {
  background: ${tokens.colors.neutral[300]};
  border-radius: ${tokens.radius.full};
}

::-webkit-scrollbar-thumb:hover {
  background: ${tokens.colors.neutral[400]};
}

/* ─── Formulários ───────────────────────────────────── */
.form-error {
  color: ${tokens.colors.danger[600]};
  font-size: ${tokens.fontSize.xs};
  padding-left: 4px;
  display: none;
}

.form-control[data-invalid="true"] {
  border: 1.5px solid ${tokens.colors.danger[500]} !important;
  box-shadow: 0 0 0 3px ${tokens.colors.danger[100]};
}

.form-control[data-invalid="true"] ~ span {
  display: unset;
}
`;
