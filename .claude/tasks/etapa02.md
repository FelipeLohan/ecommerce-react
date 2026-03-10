# Etapa 02 — Tipografia e Web Font

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens)

---

## Arquivos Envolvidos

- `index.html` *(adicionar link da fonte)*
- `src/styles/global.ts` *(atualizar font-family e escala)*

---

## Objetivo

Substituir Arial por Inter (Google Fonts) e estabelecer uma escala tipográfica consistente, eliminando todos os tamanhos em `vmin`.

---

## Implementação

### 1. `index.html` — adicionar no `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 2. `src/styles/global.ts` — GlobalStyle

```css
html {
  font-size: 16px;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.01em;
  line-height: 1.2;
}
```

### 3. Escala tipográfica (via tokens — Etapa 01)

| Token       | Size  | Line-height |
|-------------|-------|-------------|
| text-xs     | 12px  | 1.4         |
| text-sm     | 14px  | 1.5         |
| text-base   | 16px  | 1.5         |
| text-lg     | 18px  | 1.5         |
| text-xl     | 20px  | 1.4         |
| text-2xl    | 24px  | 1.3         |
| text-3xl    | 30px  | 1.2         |
| text-4xl    | 36px  | 1.1         |

### 4. Substituir `vmin` por `clamp()`

Padrão para migração:
```css
/* antes */
font-size: 2.5vmin;

/* depois */
font-size: clamp(14px, 2.5vmin, 20px);
```

---

## Critério de Conclusão

- [x] Inter carregada no `index.html` (preconnect + display=swap)
- [x] Zero ocorrências de `font-family: Arial` no projeto
- [x] Escala tipográfica definida via tokens (xs→4xl) em `tokens.ts`
- [x] Zero `vmin` restantes — 19 arquivos atualizados com tokens
