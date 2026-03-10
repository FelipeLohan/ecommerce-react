# Etapa 09 — Página Login

**Status:** [ ] Pendente
**Depende de:** Etapa 01 (tokens), Etapa 04 (CtaButton), Etapa 05 (FormInput)

---

## Arquivos Envolvidos

- `src/routes/ClientHome/Login/Login.tsx`

---

## Objetivo

Redesenhar o login com layout split-screen (gradiente brand | formulário), card polido e feedback de erro visível.

---

## Implementação

### Layout geral

```css
/* Página inteira */
display: grid;
grid-template-columns: 1fr 1fr;
min-height: 100vh;

/* Mobile (≤768px) — apenas o painel do form */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

### Painel esquerdo — Brand (oculto no mobile)

```css
background: linear-gradient(135deg, token.primary.600, token.primary.900);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 48px;
color: #ffffff;

/* Tagline */
font-size: token.fontSize['3xl'];
font-weight: 700;
line-height: 1.2;
text-align: center;
margin-bottom: 16px;

/* Subtítulo */
font-size: token.fontSize.base;
color: rgba(255, 255, 255, 0.75);
text-align: center;

@media (max-width: 768px) {
  display: none;
}
```

### Painel direito — Formulário

```css
display: flex;
align-items: center;
justify-content: center;
padding: 48px 24px;
background: token.surface.page;

/* Card do form */
width: 100%;
max-width: 440px;
background: #ffffff;
border-radius: token.radius.xl;    /* 20px */
box-shadow: token.shadow.xl;
padding: 48px 40px;

@media (max-width: 480px) {
  padding: 32px 24px;
}
```

### Conteúdo do form

```css
/* Logo / nome da loja */
font-size: token.fontSize['2xl'];
font-weight: 700;
color: token.primary.600;
margin-bottom: 8px;

/* Subtítulo */
font-size: token.fontSize.base;
color: token.neutral.500;
margin-bottom: 32px;

/* Campos (usar estilo Etapa 05) */
gap: 20px entre os campos

/* Botão login */
/* primary, fullWidth, height 48px */
margin-top: 8px;

/* Mensagem de erro inline */
display: flex;
align-items: center;
gap: 8px;
padding: 10px 14px;
background: token.danger.50;
border: 1px solid token.danger.200;
border-radius: token.radius.md;
color: token.danger.700;
font-size: token.fontSize.sm;

/* Link "Esqueci minha senha" */
font-size: token.fontSize.sm;
color: token.primary.600;
text-decoration: underline;
text-align: right;
margin-top: -8px;
```

---

## Critério de Conclusão

- [ ] Layout split-screen desktop, form centralizado mobile
- [ ] Painel brand com gradiente `token.primary.600 → token.primary.900`
- [ ] Card do form com `border-radius: xl` e sombra xl
- [ ] Campos usando estilo da Etapa 05
- [ ] Erro inline com background `danger.50` e ícone
- [ ] Link "Esqueci minha senha" presente
- [ ] Sem `width: 30%` hardcoded no container
