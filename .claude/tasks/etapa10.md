# Etapa 10 — Página Cart (Carrinho)

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens), Etapa 04 (CtaButton)

---

## Arquivos Envolvidos

- `src/routes/ClientHome/Cart/Cart.tsx`
- `src/components/ProductDetailInCart/index.tsx`

---

## Objetivo

Redesenhar o carrinho com layout split (lista de itens | painel de resumo), cada item como card, e estado vazio amigável.

---

## Implementação

### Layout geral

```css
/* Página */
max-width: 1100px;
margin: 40px auto;
padding: 0 24px;

/* Título da página */
font-size: token.fontSize['2xl'];
font-weight: 700;
color: token.neutral.900;
margin-bottom: 24px;

/* Grid split */
display: grid;
grid-template-columns: 65fr 35fr;
gap: 24px;
align-items: start;

/* Mobile (≤768px) — stack, resumo abaixo */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

### Lista de itens

```css
display: flex;
flex-direction: column;
gap: 16px;

/* Item card */
display: flex;
align-items: center;
gap: 16px;
padding: 16px;
background: #ffffff;
border: 1px solid token.neutral.100;
border-radius: token.radius.lg;
box-shadow: token.shadow.sm;

/* Imagem */
width: 80px; height: 80px;
object-fit: cover;
border-radius: token.radius.md;
flex-shrink: 0;

/* Info do produto */
flex: 1;
  nome: font-size token.fontSize.sm, font-weight 600, neutral-800
  preço unitário: font-size token.fontSize.xs, color neutral-500

/* Quantity controls */
display: flex; align-items: center; gap: 8px;
  botões +/-: 28px × 28px, border 1.5px solid neutral-200, radius md
  número: font-weight 600, min-width 28px, text-align center

/* Preço total do item */
font-size: token.fontSize.base;
font-weight: 700;
color: token.neutral.900;
min-width: 80px;
text-align: right;

/* Botão remover */
color: token.neutral.400;
transition: color token.transition.fast;
:hover { color: token.danger.500; }
/* Ícone de lixeira SVG */
```

### Painel de resumo (direita)

```css
background: token.neutral.50;
border: 1px solid token.neutral.200;
border-radius: token.radius.lg;
padding: 24px;
position: sticky;
top: 80px;  /* abaixo do header sticky */

/* Título */
font-size: token.fontSize.lg;
font-weight: 600;
color: token.neutral.900;
margin-bottom: 20px;

/* Linha de item */
display: flex;
justify-content: space-between;
font-size: token.fontSize.sm;
color: token.neutral.600;
padding: 8px 0;
border-bottom: 1px solid token.neutral.100;

/* Total */
font-size: token.fontSize.xl;
font-weight: 700;
color: token.neutral.900;
padding-top: 16px;
margin-top: 8px;

/* Botão finalizar */
/* primary, fullWidth, size lg */
margin-top: 16px;

/* "Compra segura" */
display: flex; align-items: center; gap: 6px;
font-size: token.fontSize.xs;
color: token.neutral.400;
margin-top: 12px;
justify-content: center;
/* ícone de cadeado SVG */
```

### Estado vazio

```css
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 16px;
padding: 80px 24px;
text-align: center;

/* Ícone de carrinho vazio (SVG) */
width: 80px; height: 80px;
color: token.neutral.300;

/* Texto */
font-size: token.fontSize.lg;
font-weight: 600;
color: token.neutral.700;

/* Subtexto */
font-size: token.fontSize.sm;
color: token.neutral.400;

/* Botão "Continuar comprando" */
/* primary, link para /catalog */
margin-top: 8px;
```

---

## Critério de Conclusão

- [x] Layout split 65/35 desktop, stack mobile
- [x] Cada item como card com sombra
- [x] Botão remover com hover vermelho (ícone trash)
- [x] Quantity controls estilizados
- [x] Painel resumo sticky com fundo neutro
- [x] "Compra segura" com ícone de cadeado
- [x] Estado vazio com ícone SVG e CTA
- [x] Sem `border-bottom: 1px solid #c2c2c2` hardcoded
