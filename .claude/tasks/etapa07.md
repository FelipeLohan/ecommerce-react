# Etapa 07 — ProductCatalogCard e Grid

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens), Etapa 04 (CtaButton)

---

## Arquivos Envolvidos

- `src/components/ProductCatalogCard/ProductCatalogCard.tsx`
- `src/components/CategoryCard/index.tsx`
- `src/routes/ClientHome/Catalog/Catalog.tsx`

---

## Objetivo

Redesenhar o card de produto com imagem sangrada até a borda, hover com elevação, e modernizar o grid da página Catalog para fluido com auto-fill.

---

## ProductCatalogCard

### Antes
```
padding: 40px (imagem dentro do padding)
border-radius: 8px
sem shadow, sem hover, sem transição
preço: 2.5vmin #0caf1d
```

### Depois

```css
/* Card container */
background: #ffffff;
border: 1px solid token.neutral.100;
border-radius: token.radius.lg;    /* 16px */
box-shadow: token.shadow.sm;
overflow: hidden;                   /* imagem sangra até a borda */
cursor: pointer;
transition: box-shadow token.transition.base,
            transform token.transition.base;

:hover {
  box-shadow: token.shadow.lg;
  transform: translateY(-4px);
}

/* Imagem */
width: 100%;
height: 220px;
object-fit: cover;
display: block;
transition: transform token.transition.slow;

:hover img {
  transform: scale(1.03);  /* zoom suave */
}

/* Corpo do card */
padding: 16px 20px 20px;
display: flex;
flex-direction: column;
gap: 10px;

/* Nome do produto */
font-size: token.fontSize.base;
font-weight: 600;
color: token.neutral.800;
line-height: 1.4;

/* Categorias (pills) */
display: flex; flex-wrap: wrap; gap: 6px;

/* CategoryCard pill */
background: token.neutral.100;
color: token.neutral.600;
font-size: token.fontSize.xs;
font-weight: 500;
padding: 3px 10px;
border-radius: token.radius.full;

/* Preço */
font-size: token.fontSize.xl;
font-weight: 700;
color: token.primary.600;      /* substitui #0caf1d */
margin-top: auto;

/* Botão "Ver detalhes" */
opacity: 0;
transform: translateY(6px);
transition: opacity token.transition.base, transform token.transition.base;

:hover .btn-ver-detalhes {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Grid da Catalog

### Antes
```css
display: grid;
grid-template-columns: repeat(4, 1fr); /* hardcoded */
gap: 40px;
```

### Depois

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 24px;

@media (max-width: 768px) {
  gap: 16px;
}
```

---

## Skeleton Loading

Adicionar cards de skeleton enquanto a lista carrega:

```css
/* Skeleton card */
background: token.neutral.100;
border-radius: token.radius.lg;
overflow: hidden;
height: 360px;

/* Animação pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
animation: pulse 1.5s ease-in-out infinite;
```

---

## Critério de Conclusão

- [x] Imagem sangrada até a borda do card (sem padding ao redor)
- [x] Hover com `translateY(-4px)` + sombra lg
- [x] Botão "Ver detalhes" aparece no hover (fade + slide)
- [x] Preço via `token.primary.600` (sem `#0caf1d`)
- [x] Categorias como pills neutros
- [x] Grid fluido com `auto-fill` e `minmax(280px, 1fr)`
- [x] Skeleton cards durante loading
