# Etapa 12 — Admin Pages

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens), Etapa 04 (CtaButton), Etapa 05 (FormInput, FormSelect)

---

## Arquivos Envolvidos

- `src/routes/Admin/ProductListing/ProductListing.tsx`
- `src/routes/Admin/ProductForm/ProductForm.tsx`
- `src/routes/Admin/AdminHome/AdminHome.tsx`
- `src/components/ProductAdminListCard/index.tsx`

---

## Objetivo

Dar ao painel admin aspecto de dashboard profissional: tabela polida com hover, ícones nas ações, form organizado por seções e preview de imagem.

---

## ProductListing

### Layout

```css
/* Página */
max-width: 1100px;
margin: 0 auto;
padding: 0 24px 40px;

/* Header da página */
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 24px;

  título: font-size token.fontSize['2xl'], font-weight 700, neutral-900
  /* Botão "Novo produto" — primary */
```

### Tabela

```css
width: 100%;
border-collapse: collapse;
background: #ffffff;
border-radius: token.radius.lg;
box-shadow: token.shadow.sm;
overflow: hidden;

/* Cabeçalho */
th {
  background: token.neutral.50;
  font-size: token.fontSize.xs;
  font-weight: 600;
  color: token.neutral.500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid token.neutral.100;
}

/* Linha de dado */
td {
  padding: 14px 16px;
  font-size: token.fontSize.sm;
  color: token.neutral.700;
  border-bottom: 1px solid token.neutral.50;
}

tr:hover td {
  background: token.neutral.50;
}

/* Imagem na tabela */
width: 48px; height: 48px;
object-fit: cover;
border-radius: token.radius.md;

/* Preço */
font-weight: 600;
color: token.primary.600;

/* Botões de ação */
display: flex; gap: 8px;

  editar: color token.neutral.500, :hover token.primary.600
  excluir: color token.neutral.500, :hover token.danger.600
  /* ícones SVG (lápis / lixeira) */
  width: 32px; height: 32px;
  border-radius: token.radius.md;
  :hover { background: token.neutral.100; }
  transition: color token.transition.fast, background token.transition.fast;
```

---

## ProductForm

### Layout do card

```css
max-width: 700px;      /* mais largo que antes — era 40% fixo */
margin: 0 auto;
background: #ffffff;
border-radius: token.radius.lg;
box-shadow: token.shadow.md;
overflow: hidden;

/* Header do card */
padding: 24px 32px;
border-bottom: 1px solid token.neutral.100;
font-size: token.fontSize.xl;
font-weight: 700;
color: token.neutral.900;

/* Corpo do card */
padding: 32px;
display: flex;
flex-direction: column;
gap: 24px;
```

### Seções agrupadas

```
Seção 1 — Informações básicas
  - Nome do produto (FormInput)
  - Preço (FormInput type number)
  - Descrição (FormTextArea)

Seção 2 — Mídia
  - URL da imagem (FormInput)
  - Preview: exibir <img> com a URL digitada (atualiza em tempo real)
    width: 100%; max-height: 200px; object-fit: cover; border-radius: radius.md

Seção 3 — Categorias
  - FormSelect multi-select (estilo Etapa 05)
  - Label explicando que é multi-seleção

/* Separador de seção */
font-size: token.fontSize.sm;
font-weight: 600;
color: token.neutral.500;
text-transform: uppercase;
letter-spacing: 0.05em;
padding-bottom: 8px;
border-bottom: 1px solid token.neutral.100;
margin-bottom: 16px;
```

### Rodapé com botões

```css
padding: 20px 32px;
border-top: 1px solid token.neutral.100;
display: flex;
justify-content: flex-end;
gap: 12px;

/* Cancelar — secondary */
/* Salvar — primary */
```

### Indicador de campo obrigatório

```
Asterisco vermelho (*) ao lado do label em campos obrigatórios
Legenda: "* Campos obrigatórios" no rodapé do form
```

---

## Critério de Conclusão

- [x] Tabela com header destacado e hover por linha
- [x] Ações com ícones SVG (sem texto "editar"/"excluir")
- [x] Delete com hover vermelho
- [x] Botão "Novo produto" no header da página
- [x] ProductForm com seções agrupadas visualmente
- [x] Preview da imagem ao digitar URL
- [x] Rodapé fixo com botões save/cancel
- [x] Indicador de campos obrigatórios
