# Etapa 05 — FormInput, FormTextArea e SearchInput

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens)

---

## Arquivos Envolvidos

- `src/components/FormInput/index.tsx`
- `src/components/FormTextArea/index.tsx`
- `src/components/SearchInput/index.tsx`
- `src/utils/select-style.ts` *(react-select)*

---

## Objetivo

Modernizar todos os inputs com estados hover, focus (ring azul), error e disabled. Redesenhar SearchInput como pill com ícone embutido.

---

## Implementação

### FormInput e FormTextArea — base comum

```css
/* Container do campo */
display: flex;
flex-direction: column;
gap: 6px;

/* Label */
font-size: token.fontSize.sm;
font-weight: 500;
color: token.neutral.700;

/* Input / Textarea */
border: 1.5px solid token.neutral.300;
border-radius: token.radius.md;   /* 10px */
padding: 12px 16px;
font-size: token.fontSize.sm;
color: token.neutral.800;
background: #ffffff;
transition: border-color token.transition.fast,
            box-shadow token.transition.fast;

::placeholder {
  color: token.neutral.400;
}

/* Hover */
:hover {
  border-color: token.neutral.400;
}

/* Focus */
:focus {
  border-color: token.primary.500;
  box-shadow: 0 0 0 3px token.primary.100;
  outline: none;
}

/* Estado inválido */
[invalid] / .invalid {
  border-color: token.danger.500;
  box-shadow: 0 0 0 3px token.danger.100;
}

/* Disabled */
:disabled {
  background: token.neutral.50;
  color: token.neutral.400;
  cursor: not-allowed;
}

/* Mensagem de erro */
.error-msg {
  font-size: token.fontSize.xs;
  color: token.danger.500;
}
```

### SearchInput — redesenho em pill

```
Layout: input + botão como um único elemento arredondado
- border-radius: token.radius.full (9999px)
- border: 1.5px solid token.neutral.200
- Ícone de lupa (SVG) embutido à esquerda (padding-left: 44px)
- Botão "Buscar" integrado à direita:
    background: token.primary.600
    color: #fff
    border-radius: 0 9999px 9999px 0
    padding: 10px 20px
- Hover no botão: token.primary.700
- Focus no input: ring token.primary.100
```

### select-style.ts — react-select

```ts
Atualizar para:
  control: border token.neutral.300, radius token.radius.md, min-height 44px
  control hover: border token.neutral.400
  control focused: border token.primary.500, shadow 0 0 0 3px token.primary.100
  option selected: background token.primary.600
  option hover: background token.primary.50, color token.primary.700
  placeholder: color token.neutral.400
  multiValue: background token.primary.100, color token.primary.800
  indicatorSeparator: display none
```

---

## Critério de Conclusão

- [x] FormInput com hover/focus/error/disabled visíveis
- [x] FormTextArea com os mesmos estados
- [x] SearchInput redesenhado como pill com ícone
- [x] React-Select com estilo moderno e focus ring
- [x] Sem `border: 1px solid #d9d9d9` hardcoded restantes
