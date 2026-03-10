# Etapa 13 — Micro-interações e Polish Final

**Status:** [ ] Pendente
**Depende de:** Etapas 01–12 concluídas

---

## Arquivos Envolvidos

- `src/styles/global.ts` *(keyframes e animações globais)*
- `src/components/CartIcon/index.tsx` *(bounce ao adicionar)*
- `src/components/HeaderClient/HeaderClient.tsx` *(shadow ao scroll)*
- `src/routes/ClientHome/Catalog/Catalog.tsx` *(skeleton cards)*
- `src/components/CtaButton/CtaButton.tsx` *(spinner no loading)*
- Novos componentes: `src/components/Toast/index.tsx`, `src/components/BackToTop/index.tsx`

---

## Objetivo

Dar vida à aplicação com feedback visual em todas as interações: skeletons, spinners, toasts, animações de scroll e micro-movimentos nos cards.

---

## Loading States

### Skeleton Cards (Catalog)

```css
/* Substituir ausência de loading por skeleton cards */
/* Exibir N cards enquanto isLoading === true */

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    token.neutral.100 25%,
    token.neutral.200 50%,
    token.neutral.100 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: token.radius.lg;
}

/* Skeleton card tem mesma altura que card real */
height: 360px;
```

### Spinner no botão de submit

```css
/* Ao fazer requisição, substituir texto do botão por spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
```

---

## Feedback Visual

### Toast Notifications

```tsx
/* Novo componente: src/components/Toast/index.tsx */

Posição: fixed, bottom-right (24px de borda)
Tipos: success | error | info

/* Animação */
@keyframes toastIn {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Auto-dismiss: 3000ms */
/* Barra de progresso animada no rodapé */

Cores:
  success: bg token.success.50, border token.success.200, icon token.success.600
  error:   bg token.danger.50,  border token.danger.200,  icon token.danger.600
  info:    bg token.primary.50, border token.primary.200, icon token.primary.600

Disparar ao:
  - Adicionar item ao carrinho → success "Item adicionado!"
  - Salvar produto (admin) → success "Produto salvo!"
  - Erro de login → error com mensagem do backend
  - Excluir produto → success "Produto removido"
```

### Bounce no CartIcon

```css
/* Ao adicionar item ao carrinho */
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  30%       { transform: scale(1.3); }
  60%       { transform: scale(0.9); }
}

.cart-icon-bounce {
  animation: bounce 400ms ease;
}
/* Adicionar/remover classe via estado React ao atualizar carrinho */
```

---

## Hover e Foco (globais)

```css
/* Garantir cursor pointer em todos elementos clicáveis */
button, a, [role="button"], label[for] {
  cursor: pointer;
}

/* Image zoom nos cards de produto (já coberto na Etapa 07) */
/* Underline animado nos nav links (já coberto na Etapa 06) */
```

---

## Page-level

### Shadow dinâmica no Header ao scroll

```tsx
/* src/components/HeaderClient/HeaderClient.tsx */
/* Já planejado na Etapa 06 — implementar aqui se pendente */

useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

### Back-to-Top Button

```tsx
/* Novo componente: src/components/BackToTop/index.tsx */

/* Aparece após 500px de scroll */
/* Posição: fixed, bottom-right (80px de borda) */
/* Clique: window.scrollTo({ top: 0, behavior: 'smooth' }) */

background: token.primary.600;
color: #ffffff;
width: 44px; height: 44px;
border-radius: token.radius.full;
box-shadow: token.shadow.md;
transition: opacity token.transition.base, transform token.transition.base;

/* Escondido: opacity 0, translateY(16px), pointer-events none */
/* Visível: opacity 1, translateY(0), pointer-events auto */
```

---

## Critério de Conclusão

- [ ] Skeleton shimmer visível durante loading da lista de produtos
- [ ] Spinner no botão ao submeter formulários/login
- [ ] Toast de sucesso ao adicionar ao carrinho
- [ ] Toast de sucesso ao salvar/excluir produto no admin
- [ ] Toast de erro no login com mensagem legível
- [ ] Bounce no ícone do carrinho ao adicionar item
- [ ] Shadow dinâmica no header ao fazer scroll
- [ ] Back-to-top button funcional após 500px de scroll
- [ ] `cursor: pointer` em todos elementos clicáveis
