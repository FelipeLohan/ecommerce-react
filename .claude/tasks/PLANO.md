# Plano — Menu do Usuário + Página Minha Conta

## Visão geral
Ao clicar no avatar do usuário no header, exibir um dropdown com duas opções:
- **Minha conta** → navega para `/my-account` (página com dados do usuário)
- **Sair** → encerra a sessão

## Etapas

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | `etapa-01-dropdown.md` | Adicionar dropdown ao `LoggedUser` com "Minha conta" e "Sair" |
| 02 | `etapa-02-page.md` | Criar página `src/routes/ClientHome/MyAccount/` |
| 03 | `etapa-03-route.md` | Registrar rota `/my-account` (PrivateRoute) no `App.tsx` |

## Fluxo esperado
```
Header (avatar) → clica → dropdown abre
  ├── "Minha conta" → navega para /my-account
  │     └── GET /users/me (findMe já existe em user-service.ts)
  │           └── exibe nome, email do usuário
  └── "Sair" → authService.logout() + limpa contexto → redireciona para /
```

## Estado atual do LoggedUser
- Avatar já existe como `<button>` com a inicial do usuário
- Clique atual faz logout direto — será substituído por abrir/fechar dropdown
- `findMe()` já existe em `user-service.ts` (GET /users/me com withCredentials)
