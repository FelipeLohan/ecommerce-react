# Etapa 04 — Componente CtaButton

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens)

---

## Arquivos Envolvidos

- `src/components/CtaButton/CtaButton.tsx`

---

## Objetivo

Redesenhar o CtaButton com variantes modernas, estados completos (hover, active, disabled, focus-visible) e transições suaves. Remover largura fixa de 220px.

---

## Problema Atual

```tsx
// Antes: tamanho fixo, sem estados, sem transições
width: 220px;
height: 50px;
border-radius: 12px;
font-size: 2.2vmin;
border: 1px solid ${primaryColor};
```

---

## Implementação

### Variantes

```
primary   → fundo token.primary.600, texto branco
secondary → outline token.primary.600, texto token.primary.600, hover fill
danger    → fundo token.danger.600, texto branco
ghost     → transparente, texto token.primary.600, hover bg token.primary.50
```

### Estados (todos os variantes)

```css
/* base */
transition: background token.transition.base,
            box-shadow token.transition.base,
            transform token.transition.fast,
            border-color token.transition.fast;
border-radius: token.radius.lg;    /* 16px */
padding: 12px 24px;
font-size: token.fontSize.sm;
font-weight: 500;
cursor: pointer;

/* hover */
box-shadow: token.shadow.md;
transform: translateY(-1px);

/* active */
transform: translateY(0);
box-shadow: token.shadow.sm;

/* disabled */
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;

/* focus-visible */
outline: 2px solid token.primary.500;
outline-offset: 2px;
```

### Props da interface

```tsx
interface CtaButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

---

## Critério de Conclusão

- [x] Variantes primary, secondary, danger e ghost funcionando
- [x] Hover com elevação (`translateY(-1px)` + `shadow.md`)
- [x] Disabled com `opacity: 0.5` e `cursor: not-allowed`
- [x] `focus-visible` com ring `primary.500` 2px
- [x] Sem `width: 220px` fixo — tamanho por conteúdo ou `fullWidth`
- [x] Sem `vmin` — escala `sm/md/lg` via tokens
- [x] Todos os 4 arquivos consumidores migrados para a nova API
