# Etapa 06 — Headers (Client e Admin)

**Status:** [ ] Pendente
**Depende de:** Etapa 01 (tokens), Etapa 02 (tipografia)

---

## Arquivos Envolvidos

- `src/components/HeaderClient/HeaderClient.tsx`
- `src/components/HeaderAdmin/HeaderAdmin.tsx`
- `src/components/CartIcon/index.tsx`
- `src/components/LoggedUser/index.tsx`

---

## Objetivo

Substituir o header amarelo chocante (`#ffe500`) e o admin verde neon (`#0caf1d`) por layouts modernos, sticky, com efeito glass e estados de navegação.

---

## HeaderClient

### Antes
```
background: #ffe500 (amarelo elétrico)
padding: 40px flat
sem sticky, sem shadow, sem hover nos links
```

### Depois

```css
/* Container */
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(8px);
border-bottom: 1px solid token.neutral.100;
box-shadow: token.shadow.sm;
position: sticky;
top: 0;
z-index: 100;
padding: 0 token.spacing[10];   /* 40px */
height: 64px;
display: flex;
align-items: center;
justify-content: space-between;
transition: box-shadow token.transition.base;

/* ao fazer scroll (classe .scrolled adicionada via JS) */
.scrolled {
  box-shadow: token.shadow.md;
}

/* Logo */
font-size: token.fontSize.xl;
font-weight: 700;
color: token.primary.600;
letter-spacing: -0.02em;

/* Nav links */
font-size: token.fontSize.sm;
font-weight: 500;
color: token.neutral.600;
position: relative;

/* Underline animado no hover */
::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 2px;
  background: token.primary.500;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform token.transition.base;
}
:hover::after { transform: scaleX(1); }
:hover { color: token.neutral.900; }
```

### CartIcon
```css
/* Badge vermelho → moderno */
background: token.danger.500;
border-radius: token.radius.full;
font-size: 10px;
font-weight: 600;
min-width: 18px; height: 18px;
display: flex; align-items: center; justify-content: center;
position: absolute; top: -6px; right: -6px;
border: 2px solid #ffffff;
```

### LoggedUser
```css
/* Avatar com inicial do nome */
width: 34px; height: 34px;
border-radius: token.radius.full;
background: token.primary.100;
color: token.primary.700;
font-weight: 600;
font-size: token.fontSize.sm;
display: flex; align-items: center; justify-content: center;
```

---

## HeaderAdmin

### Antes
```
background: #0caf1d (verde neon)
padding: 40px 0px, margin-bottom: 40px
```

### Depois

```css
/* Container */
background: token.neutral.900;  /* dark slate */
padding: 0 token.spacing[10];
height: 60px;
display: flex;
align-items: center;
justify-content: space-between;
color: #ffffff;
margin-bottom: token.spacing[10];

/* Logo/brand */
font-size: token.fontSize.lg;
font-weight: 700;
color: #ffffff;

/* Nav links */
font-size: token.fontSize.sm;
color: token.neutral.400;
transition: color token.transition.fast;

:hover { color: #ffffff; }

/* Active link */
.active {
  color: #ffffff;
  border-bottom: 2px solid token.primary.400;
  padding-bottom: 2px;
}

/* Badge "Admin" */
background: token.primary.600;
color: #ffffff;
padding: 2px 10px;
border-radius: token.radius.full;
font-size: token.fontSize.xs;
font-weight: 600;
```

---

## Critério de Conclusão

- [ ] HeaderClient sem `#ffe500` — branco com glass effect
- [ ] Header sticky no topo com z-index correto
- [ ] Nav links com underline animado no hover
- [ ] CartIcon badge moderno com borda branca
- [ ] LoggedUser como avatar com inicial
- [ ] HeaderAdmin dark, sem `#0caf1d`
- [ ] Active state visível no link atual do admin
