# Etapa 11 — Dialogs (Info e Confirmation)

**Status:** [x] Concluída
**Depende de:** Etapa 01 (tokens), Etapa 04 (CtaButton)

---

## Arquivos Envolvidos

- `src/components/DialogInfo/index.tsx`
- `src/components/DialogConfirmation/index.tsx`

---

## Objetivo

Substituir as bordas duras (`3px solid rgb(165,165,165)`) por modais modernos com backdrop blur, sombra e animação de entrada.

---

## Implementação

### Overlay

```css
/* Antes: rgba(0,0,0,0.3) sem blur */
/* Depois: */
position: fixed;
inset: 0;
background: rgba(15, 23, 42, 0.4);   /* neutral-900 com 40% opacidade */
backdrop-filter: blur(4px);
display: flex;
align-items: center;
justify-content: center;
z-index: 200;

/* Animação de entrada */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
animation: fadeIn 200ms ease;
```

### Container do modal

```css
/* Antes: border: 3px solid rgb(165,165,165), sem sombra */
/* Depois: */
background: #ffffff;
border: none;                        /* remove borda dura */
border-radius: token.radius.xl;      /* 20px */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);   /* sombra xl */
padding: 32px;
width: 90%;
max-width: 440px;
position: relative;

/* Animação de entrada */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
animation: slideUp 250ms cubic-bezier(0.16, 1, 0.3, 1);
```

### DialogInfo

```css
/* Ícone contextual */
width: 48px; height: 48px;
border-radius: token.radius.full;
display: flex; align-items: center; justify-content: center;
margin: 0 auto 16px;

  /* success: bg token.success.100, icon token.success.600 */
  /* info:    bg token.primary.100, icon token.primary.600 */
  /* warning: bg token.accent.100,  icon token.accent.600  */
  /* error:   bg token.danger.100,  icon token.danger.600  */

/* Título */
font-size: token.fontSize.lg;
font-weight: 600;
color: token.neutral.900;
text-align: center;
margin-bottom: 8px;

/* Mensagem */
font-size: token.fontSize.sm;
color: token.neutral.600;
text-align: center;
line-height: 1.6;

/* Botão fechar (X) */
position: absolute;
top: 16px; right: 16px;
color: token.neutral.400;
:hover { color: token.neutral.700; }

/* Botão confirmar */
/* primary, fullWidth, margin-top 24px */
```

### DialogConfirmation

```css
/* Ícone de alerta */
/* mesmo padrão — warning ou danger */

/* Título + mensagem */
/* mesmo padrão do DialogInfo */

/* Botões — flex row, gap 12px */
display: flex;
gap: 12px;
margin-top: 24px;

/* Cancelar: secondary/ghost, flex: 1 */
/* Confirmar: primary ou danger, flex: 1 */
/* Ordem visual: Cancelar (esquerda) | Confirmar (direita) */
```

---

## Critério de Conclusão

- [x] Overlay com `backdrop-filter: blur(4px)`
- [x] Container sem borda dura — apenas sombra xl
- [x] Animação `slideUp` na abertura
- [x] Botão fechar (X) no canto superior do DialogInfo
- [x] Ícone contextual colorido (success/info/warning/error)
- [x] DialogConfirmation com botões lado a lado usando tokens
- [x] Sem `border: 3px solid rgb(165,165,165)` no código
