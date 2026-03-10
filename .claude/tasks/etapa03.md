# Etapa 03 — GlobalStyle e Reset Moderno

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens), Etapa 02 (tipografia)

---

## Arquivos Envolvidos

- `src/styles/global.ts` *(reescrever completamente)*
- `src/main.tsx` *(importar novo GlobalStyle)*

---

## Objetivo

Substituir o GlobalStyle minimalista atual por um reset moderno com antialiasing, scrollbar customizada, focus acessível e background via token.

---

## Implementação

### Reset e base

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background-color: token.surface.page; /* substitui #E8E8E8 hardcoded */
  color: token.neutral.800;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
```

### Seleção de texto

```css
::selection {
  background-color: token.primary.100;
  color: token.primary.900;
}
```

### Focus acessível (substitui outline padrão)

```css
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid token.primary.500;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Scrollbar customizada (webkit)

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: token.neutral.100;
}

::-webkit-scrollbar-thumb {
  background: token.neutral.300;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: token.neutral.400;
}
```

### Links e elementos interativos

```css
a {
  color: inherit;
  text-decoration: none;
  transition: color token.transition.fast;
}

button, [role="button"] {
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}
```

### Erros de formulário

```css
.form-error {
  color: token.danger.500;
  font-size: token.fontSize.xs;
  margin-top: 4px;
}
```

---

## Critério de Conclusão

- [x] Background da página via token (sem `#E8E8E8` hardcoded)
- [x] `:focus-visible` com ring `primary.500` em todos os elementos interativos
- [x] Scrollbar customizada (webkit) fina e discreta
- [x] `::selection` com `primary.100` / `primary.900`
- [x] Antialiasing aplicado (`-webkit-font-smoothing: antialiased`)
- [x] GlobalStyle extraído para `src/styles/global.ts`
