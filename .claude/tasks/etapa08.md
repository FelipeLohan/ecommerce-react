# Etapa 08 — Página ProductDetails

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens), Etapa 04 (CtaButton), Etapa 07 (CategoryCard pills)

---

## Arquivos Envolvidos

- `src/routes/ClientHome/ProductDetails/index.tsx`
- `src/components/ProductDetailsCard/ProductDetailsCard.tsx`

---

## Objetivo

Redesenhar a página de detalhes do produto com layout em dois painéis (imagem | info), hierarquia visual clara e botão CTA proeminente.

---

## Implementação

### Layout geral

```css
/* Wrapper da página */
max-width: 1100px;
margin: 40px auto;
padding: 0 24px;

/* Dois painéis — desktop */
display: grid;
grid-template-columns: 1fr 1fr;
gap: 48px;
align-items: start;

/* Mobile (≤768px) — stack vertical */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 24px;
}
```

### Painel esquerdo — Imagem

```css
border-radius: token.radius.lg;
box-shadow: token.shadow.md;
aspect-ratio: 1 / 1;
object-fit: cover;
width: 100%;
```

### Painel direito — Informações

```css
display: flex;
flex-direction: column;
gap: 20px;

/* Breadcrumb */
font-size: token.fontSize.sm;
color: token.neutral.400;
/* ex: Home > Catálogo > Nome do Produto */

/* Categories pills */
display: flex; flex-wrap: wrap; gap: 8px;
/* reutilizar estilo da Etapa 07 */

/* Nome do produto */
font-size: token.fontSize['3xl'];  /* 30px */
font-weight: 700;
color: token.neutral.900;
line-height: 1.2;

/* Preço */
font-size: token.fontSize['4xl'];  /* 36px */
font-weight: 700;
color: token.primary.600;

/* Divider */
border: none;
border-top: 1px solid token.neutral.100;

/* Descrição */
font-size: token.fontSize.base;
color: token.neutral.600;
line-height: 1.7;

/* Quantity selector */
display: flex;
align-items: center;
gap: 12px;

  /* Botões - e + */
  width: 36px; height: 36px;
  border: 1.5px solid token.neutral.200;
  border-radius: token.radius.md;
  background: #fff;
  font-size: token.fontSize.lg;
  font-weight: 500;
  transition: border-color token.transition.fast, background token.transition.fast;
  :hover { border-color: token.primary.500; background: token.primary.50; }

  /* Número */
  font-size: token.fontSize.lg;
  font-weight: 600;
  min-width: 32px;
  text-align: center;

/* Botão "Adicionar ao carrinho" */
/* variante primary, fullWidth, size lg */
/* Adicionar ícone de carrinho à esquerda */
margin-top: 8px;
```

---

## Critério de Conclusão

- [x] Layout dois painéis no desktop, stack no mobile
- [x] Imagem com aspect-ratio 1:1 e sombra
- [x] Breadcrumb visível acima do nome
- [x] Hierarquia clara: categorias → nome → preço → descrição → ação
- [x] Quantity selector estilizado
- [x] Botão "Adicionar ao carrinho" proeminente, full width
- [x] Sem `vmin` nos font-sizes
