# Etapa 01 — Design Tokens (CSS Variables)

**Status:** [x] Concluída

---

## Arquivos Envolvidos

- `src/styles/tokens.ts` *(criar)*
- `src/main.tsx` *(atualizar GlobalStyle para injetar tokens)*

---

## Objetivo

Criar o sistema de design tokens que servirá de base para todas as etapas seguintes.
Nenhum valor hardcoded de cor, espaçamento ou tipografia deve permanecer nos componentes — tudo via token.

---

## Implementação

### Criar `src/styles/tokens.ts`

```ts
Exportar objeto com:

cores:
  Primária:   #2563EB (azul moderno) com variantes 50→950
  Sucesso:    #16A34A (verde natural)
  Neutros:    #0F172A → #F8FAFC (slate scale)
  Accent:     #F59E0B (âmbar — substitui o amarelo elétrico)
  Danger:     #DC2626
  Superfície: #FFFFFF cards, #F1F5F9 background

escala tipográfica:
  font-size xs → 5xl
  font-weight: 400, 500, 600, 700
  line-height: 1.1 → 1.7

escala de espaçamento (base 4px):
  2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

border radius:
  sm:   6px
  md:   10px
  lg:   16px
  xl:   20px
  full: 9999px

sombras:
  sm: 0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)
  md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)
  lg: 0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)
  xl: 0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)

transições:
  fast: 150ms ease
  base: 250ms ease
  slow: 400ms ease

breakpoints:
  sm:  480px
  md:  768px
  lg:  1024px
  xl:  1280px
```

---

## Critério de Conclusão

- [x] `src/styles/tokens.ts` criado e exportando o objeto completo
- [x] Tokens injetados no `GlobalStyle` de `src/main.tsx`
- [x] Build TypeScript passando sem erros (fix aplicado em App.tsx)
