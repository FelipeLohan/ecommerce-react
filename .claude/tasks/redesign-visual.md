# Plano de Redesign Visual — Ecommerce React

> **Objetivo:** Modernizar o design do site do padrão 2017-2018 para 2025, com identidade visual coesa,
> micro-interações, tipografia moderna e sistema de design escalável.
>
> **Princípios:** Mobile-first · Acessível · Consistente · Sem dependências extras (só styled-components)

---

## Diagnóstico Atual

| Problema | Detalhe |
|---|---|
| Fonte | Arial hardcoded — sem web font |
| Cores | Verde neon #0caf1d, amarelo elétrico #ffe500, azul chapado #3483FA |
| Sombras | Inexistentes — zero depth/elevação |
| Hover/Focus | Nenhum estado visual definido |
| Transições | Ausentes — interface travada |
| Tokens | Valores mágicos espalhados por todos os arquivos |
| Tipografia | Escala arbitrária em `vmin` sem ritmo definido |
| Modais | Borda dura `3px solid rgb(165,165,165)` sem blur/sombra |
| Formulários | Sem estados focus visíveis, sem feedback visual |

---

## Etapa 1 — Design Tokens (CSS Variables)

**Arquivo:** `src/styles/tokens.ts` (exporta objeto) + inject no `GlobalStyle` via `createGlobalStyle`

```
Criar sistema de tokens:
  - Paleta de cores (primária, neutros, feedback, superfícies)
  - Escala tipográfica (font-size xs → 5xl, font-weight, line-height)
  - Escala de espaçamento (4px base × 2, 4, 6, 8, 10, 12, 16, 20, 24...)
  - Border radius (sm: 6px, md: 10px, lg: 16px, full: 9999px)
  - Sombras (sm, md, lg, xl)
  - Transições (fast: 150ms, base: 250ms, slow: 400ms)
  - Breakpoints (sm: 480px, md: 768px, lg: 1024px, xl: 1280px)
```

**Nova paleta sugerida:**
```
Primária:   #2563EB (azul moderno) com variantes 50→950
Sucesso:    #16A34A (verde natural)
Neutros:    #0F172A → #F8FAFC (slate scale)
Accent:     #F59E0B (âmbar — substitui o amarelo elétrido)
Danger:     #DC2626
Superfície: #FFFFFF cards, #F1F5F9 background
```

**Critério de conclusão:** Nenhum valor hardcoded de cor/spacing nos componentes — tudo via token.

---

## Etapa 2 — Tipografia e Web Font

**Arquivo:** `index.html` + `src/styles/global.ts`

```
1. Adicionar no <head> do index.html:
   - Inter (corpo e UI) — weights 400, 500, 600, 700
   - Opcional: Syne ou Outfit para headings

2. Atualizar GlobalStyle:
   - font-family: 'Inter', system-ui, -apple-system, sans-serif
   - font-size base: 16px no html
   - line-height base: 1.5
   - letter-spacing: -0.01em para headings

3. Criar escala tipográfica com tokens:
   - text-xs:  12px / 1.4
   - text-sm:  14px / 1.5
   - text-base: 16px / 1.5
   - text-lg:  18px / 1.5
   - text-xl:  20px / 1.4
   - text-2xl: 24px / 1.3
   - text-3xl: 30px / 1.2
   - text-4xl: 36px / 1.1
```

**Substituir:** Todos os `vmin` hardcoded por valores fixos com clamp() para responsividade.

**Critério de conclusão:** Inter carregada, zero `font-family: Arial`, escala consistente.

---

## Etapa 3 — GlobalStyle e Reset Moderno

**Arquivo:** `src/styles/global.ts`

```
Atualizar GlobalStyle com:
  - Scroll behavior: smooth
  - Antialiasing: -webkit-font-smoothing: antialiased
  - Focus-visible outline customizado (acessibilidade)
  - ::selection com cor da brand
  - Scrollbar customizada (webkit) — fina e discreta
  - Transição de cor padrão em links e botões interativos
  - Remover outline padrão do browser substituindo por focus-visible ring
  - Background: token.surface.page (substituir #E8E8E8 hardcoded)
```

**Critério de conclusão:** Reset consistente, focus acessível, sem flash de estilos.

---

## Etapa 4 — Componente CtaButton

**Arquivo:** `src/components/CtaButton/CtaButton.tsx`

```
Redesenhar variantes:
  - primary: fundo azul sólido com hover darken + shadow
  - secondary: outline com hover fill
  - danger: fundo vermelho
  - ghost: transparente com hover bg

Adicionar em todos:
  - transition: background 250ms, box-shadow 250ms, transform 150ms
  - hover: sombra md + leve translateY(-1px)
  - active: translateY(0) + sombra sm
  - disabled: opacity 0.5, cursor not-allowed
  - focus-visible: ring 2px offset 2px

Ajustar:
  - Border radius: token.radius.lg (16px)
  - Padding: 12px 24px (consistente, não 220px largura fixa)
  - Font: font-medium (500) + text-sm
  - Ícone opcional (slot esquerdo/direito)
```

**Critério de conclusão:** Botão com estados completos, sem tamanho fixo, variantes funcionando.

---

## Etapa 5 — FormInput, FormTextArea e SearchInput

**Arquivos:** `src/components/FormInput/`, `FormTextArea/`, `SearchInput/`

```
Atualizar inputs com:
  - Border: 1.5px solid token.neutral.300
  - Border radius: token.radius.md (10px)
  - Padding: 12px 16px
  - font-size: text-sm
  - Transição: border-color 150ms, box-shadow 150ms

  :hover
    border-color: token.neutral.400

  :focus-within / :focus
    border-color: token.primary.500
    box-shadow: 0 0 0 3px token.primary.100 (ring)
    outline: none

  [invalid]
    border-color: token.danger.500
    box-shadow: 0 0 0 3px token.danger.100

  ::placeholder
    color: token.neutral.400

Label:
  - font-size: text-sm, font-weight: 500
  - color: token.neutral.700
  - margin-bottom: 6px

SearchInput:
  - Redesenhar como input com ícone de lupa embutido à esquerda
  - Botão buscar integrado como parte do input (estilo pill)
```

**Critério de conclusão:** Todos inputs com estados hover/focus/error/disabled definidos.

---

## Etapa 6 — Headers (Client e Admin)

**Arquivos:** `src/components/HeaderClient/`, `HeaderAdmin/`

### HeaderClient
```
Antes: Fundo #ffe500 (amarelo chocante), padding 40px flat

Depois:
  - Background: #FFFFFF com border-bottom: 1px solid token.neutral.100
  - Box-shadow: sombra sm (sutil)
  - Logo: fonte bold, usar cor primária
  - Position: sticky top: 0, z-index: 100
  - Backdrop-filter: blur(8px) + background semi-transparente para efeito glass
  - Nav links: hover com underline animado (scale X 0→1)
  - CartIcon: badge redesenhado (posição absoluta, radius full)
  - LoggedUser: avatar com inicial do nome (círculo com bg primário)
  - Transição de sombra ao scroll (adicionar classe via JS/estado)
```

### HeaderAdmin
```
Antes: Fundo #0caf1d (verde neon), flat

Depois:
  - Background: token.neutral.900 (dark slate) ou gradient sutil
  - Sidebar layout opcional (desktop) ou manter top nav
  - Ícones SVG nos links de navegação
  - Badge de role "Admin" com pill style
  - Active state no link atual (border-bottom ou bg highlight)
```

**Critério de conclusão:** Headers modernos, sticky, com estados de hover/active/focus.

---

## Etapa 7 — ProductCatalogCard e Grid

**Arquivos:** `src/components/ProductCatalogCard/`, `src/routes/ClientHome/Catalog/`

```
Card redesenhado:
  - Background: #fff
  - Border: 1px solid token.neutral.100
  - Border-radius: token.radius.lg (16px)
  - Box-shadow: sombra sm
  - overflow: hidden (para imagem sangrar até a borda)
  - Transição: box-shadow 250ms, transform 250ms

  :hover
    box-shadow: sombra lg
    transform: translateY(-4px)

Imagem:
  - height: 220px, object-fit: cover
  - Sem padding lateral na imagem (sangrar até borda do card)
  - Overlay sutil com gradiente no hover (escurece 10%)

Conteúdo do card:
  - Padding: 16px 20px
  - Nome: text-base, font-semibold, neutral-800
  - Categorias: pills com bg neutral-100, text-xs, neutral-600
  - Preço: text-xl, font-bold, primary-600
  - Botão "Ver detalhes": full width, variante ghost, aparece no hover (opacity + translateY)

Grid da Catalog:
  - gap: 24px (desktop) → 16px (mobile)
  - Auto-fill com minmax(280px, 1fr) para grid fluido
  - Skeleton loading cards (animated pulse) enquanto carrega
```

**Critério de conclusão:** Cards com hover animado, imagem sangrada, preço destacado, grid fluido.

---

## Etapa 8 — Página ProductDetails

**Arquivo:** `src/routes/ClientHome/ProductDetails/`, `src/components/ProductDetailsCard/`

```
Layout:
  - Dois painéis lado a lado (imagem esquerda | info direita) no desktop
  - Stack vertical no mobile
  - Max-width: 1100px, centralizado

Painel imagem:
  - Border-radius: token.radius.lg
  - Sombra md
  - Aspect ratio: 1/1, object-fit: cover

Painel info:
  - Categories: pills horizontais (mesmo estilo do card)
  - Nome: text-3xl, font-bold, neutral-900
  - Preço: text-4xl, font-bold, primary-600
  - Descrição: text-base, neutral-600, line-height: 1.7
  - Botão "Adicionar ao carrinho": primary, full width, tamanho lg, com ícone de carrinho
  - Quantity selector inline (- N +) com estilo moderno
  - Divider sutil entre seções
  - Breadcrumb: Home > Catalog > Nome Produto
```

**Critério de conclusão:** Layout em dois painéis, hierarquia visual clara, botão CTA proeminente.

---

## Etapa 9 — Página Login

**Arquivo:** `src/routes/ClientHome/Login/`

```
Layout:
  - Tela dividida: lado esquerdo com imagem/gradiente brand, lado direito com form
  - Mobile: apenas o form centralizado

Card do form:
  - Max-width: 440px
  - Padding: 48px 40px
  - Background: #fff
  - Border-radius: token.radius.xl (20px)
  - Sombra xl

Elementos:
  - Logo/título do site no topo do form
  - Subtítulo: "Entre na sua conta"
  - Labels e inputs modernizados (Etapa 5)
  - Botão login: primary, full width, height 48px, font-medium
  - Link "Esqueci minha senha" (mesmo que não funcional)
  - Divisor com "ou" para futura autenticação social
  - Feedback de erro: toast ou inline com ícone e cor danger

Background esquerdo:
  - Gradiente: primary-600 → primary-900
  - Tagline da loja sobreposta
  - Ilustração SVG ou imagem de produto em destaque
```

**Critério de conclusão:** Login com layout split, form polido, feedback de erro visível.

---

## Etapa 10 — Página Cart (Carrinho)

**Arquivo:** `src/routes/ClientHome/Cart/`

```
Layout:
  - Dois painéis: lista de itens (esquerda 65%) | resumo/checkout (direita 35%)
  - Mobile: stack vertical, resumo abaixo

Lista de itens:
  - Cada item: card com border, radius md, sombra sm
  - Imagem: 80×80px, radius sm, object-fit: cover
  - Remove button: ícone trash com hover danger color
  - Quantity controls: input numérico com + / - estilizados
  - Preço: destaque à direita do item

Painel resumo:
  - Background: neutral-50
  - Border: 1px solid neutral-200
  - Border-radius: token.radius.lg
  - Padding: 24px
  - Subtotal, itens, total destacado
  - Botão "Finalizar Pedido": primary, full width, tamanho lg
  - Ícone de cadeado + "Compra segura" abaixo do botão

Estado vazio:
  - Ilustração SVG de carrinho vazio
  - Texto amigável
  - Botão "Continuar comprando" → /catalog
```

**Critério de conclusão:** Layout split, itens com card estilo, painel de resumo destacado.

---

## Etapa 11 — Dialogs (Info e Confirmation)

**Arquivos:** `src/components/DialogInfo/`, `src/components/DialogConfirmation/`

```
Overlay:
  - backdrop-filter: blur(4px)
  - background: rgba(15, 23, 42, 0.4) (neutro escuro, não preto puro)
  - Animação de entrada: fade-in 200ms

Container:
  - Remover borda dura (3px solid cinza)
  - Box-shadow: sombra xl (0 25px 50px -12px rgba(0,0,0,0.25))
  - Border-radius: token.radius.xl (20px)
  - Padding: 32px
  - Animation: slide-up + fade-in 250ms ease-out

DialogInfo:
  - Ícone contextual no topo (success/info/warning/error)
  - Título bold, mensagem em neutral-600
  - Botão fechar (X) no canto superior direito

DialogConfirmation:
  - Ícone de alerta/pergunta
  - Botão cancelar: ghost/outline
  - Botão confirmar: primary ou danger dependendo da ação
  - Layout de botões: flex row-reverse (destaque no confirmar)
```

**Critério de conclusão:** Modais com blur, animação de entrada, sem bordas duras.

---

## Etapa 12 — Admin Pages

**Arquivos:** `src/routes/Admin/`

### ProductListing
```
- Tabela responsiva com hover highlight por linha
- Ações (edit/delete) com ícones ao invés de texto
- Delete: hover danger color
- Status pills (ativo/inativo se houver)
- Header da tabela: neutral-100 bg, font-semibold
- Paginação estilizada
- Botão "Novo produto" proeminente no topo
```

### ProductForm
```
- Layout de form card centralizado e mais largo (60% desktop)
- Seções agrupadas visualmente (informações básicas | mídia | categorias)
- Preview da imagem ao digitar URL
- FormSelect de categorias com estilo moderno (Etapa 5)
- Botões save/cancel no rodapé fixo do card
- Indicador de campos obrigatórios (asterisco + legenda)
```

**Critério de conclusão:** Admin com look profissional de dashboard, tabela polida, form organizado.

---

## Etapa 13 — Micro-interações e Polish Final

```
Adicionar em toda a aplicação:

Loading States:
  - Skeleton screens (pulse animation) em cards e listas
  - Spinner no botão de submit durante chamadas API
  - Page transition fade entre rotas

Feedback Visual:
  - Toast notifications (sucesso/erro) ao adicionar ao carrinho, salvar produto, etc.
  - Animação de "bounce" no ícone do carrinho ao adicionar item
  - Número do badge com counter animation

Hover e Foco:
  - Cursor pointer em todos elementos clicáveis
  - Underline animado em links de nav (scale-x transform)
  - Image zoom suave nos cards de produto (scale 1.03)

Page-level:
  - Header shadow aparece ao fazer scroll (IntersectionObserver ou scroll listener)
  - Back-to-top button após scrollar 500px
  - Smooth scroll entre seções
```

**Critério de conclusão:** Todas as interações têm feedback visual. App parece viva e responsiva.

---

## Ordem de Execução Recomendada

```
1 → Tokens         (base de tudo, sem isso nada é consistente)
2 → Tipografia     (impacto visual imediato em toda a app)
3 → GlobalStyle    (limpeza do reset e base)
4 → CtaButton      (componente mais usado — alto impacto)
5 → FormInput      (melhora todos os formulários de uma vez)
6 → Headers        (primeira impressão do site)
7 → ProductCatalogCard + Grid  (coração do e-commerce)
8 → ProductDetails (segunda página mais visitada)
9 → Login          (conversão)
10 → Cart          (checkout)
11 → Dialogs       (polish)
12 → Admin         (secundário)
13 → Micro-interações (polish final)
```

---

## Referências de Design

- **Estilo alvo:** Shopify / Linear / Stripe — clean, espaçoso, tipografia forte
- **Paleta:** Shadcn/ui neutral scale + blue/green accent
- **Componentes:** Inspiração em Radix UI visual, MUI v5, Ant Design 5
- **Fonte:** Inter (https://fonts.google.com/specimen/Inter)
- **Ícones:** Lucide React ou Heroicons (SVG inline, sem dependência pesada)
