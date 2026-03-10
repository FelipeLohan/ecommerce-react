# Ecommerce React — Contexto do Projeto

## Visão Geral
Aplicação e-commerce full-featured em React + TypeScript. Frontend no Netlify, backend Spring Boot no Heroku (MySQL).

- **Frontend:** https://ecommerce-lohan.netlify.app/
- **Backend API:** https://ecommerce-spring-ec44b57ed84d.herokuapp.com
- **Stack:** React 18, TypeScript, Vite, styled-components, react-router-dom v6, axios, jwt-decode

## Comandos

```bash
npm run dev      # Inicia servidor de desenvolvimento (Vite)
npm run build    # tsc -b && vite build
npm run lint     # ESLint
npm run preview  # Preview do build
```

## Estrutura de Pastas

```
src/
├── components/      # Componentes reutilizáveis de UI
├── routes/          # Páginas/rotas (Admin/, ClientHome/)
├── models/          # Tipos e interfaces TypeScript (DTOs)
├── services/        # Chamadas à API (axios)
├── localstorage/    # Persistência (cart, token)
├── utils/           # Configurações, contextos, helpers
└── assets/          # SVGs e imagens
```

## Arquitetura

### Contextos Globais (Context API)
- `ContextToken` — payload do JWT do usuário autenticado
- `ContextCartQuantity` — quantidade de itens no carrinho

### Autenticação
- OAuth2 com Basic auth (`CLIENT_ID:CLIENT_SECRET`) no endpoint de token
- JWT armazenado em localStorage com chave `"com.celestialcommerce/Token"`
- `auth-service.ts`: `loginRequest()`, `getAccessTokenPayload()`, `isAuthenticated()`, `hasAnyRoles()`
- Roles: `"ROLE_ADMIN"` | `"ROLE_CLIENT"`

### HTTP / Axios
- Todas as requisições passam por `utils/requests.ts` → `requestBackend(config)`
- Adiciona `BASE_URL`, header `Authorization: Bearer <token>` automaticamente
- Interceptors: 401 → redireciona para `/login`, 403 → redireciona para `/catalog`

### Roteamento
- `unstable_HistoryRouter` do pacote `history` (necessário para redirect nos interceptors)
- Rotas cliente: `/catalog`, `/product-details/:id`, `/cart`, `/login`, `/confirmation/:orderId`
- Rotas admin (protegidas por `ROLE_ADMIN`): `/admin/home`, `/admin/products`, `/admin/products/:id`

### LocalStorage
- Cart: chave `"com.celestialcommerce/Cart"` → `OrderDTO` serializado
- Token: chave `"com.celestialcommerce/Token"` → string JWT

### Formulários
- Helper em `utils/forms.ts` — `update()`, `validate()`, `updateAndValidate()`, `toValues()`, `updateAll()`
- Cada campo é um objeto `{ value, validation?, message?, invalid?, id, name, ... }`

## Modelos Principais (src/models/)

```typescript
ProductDTO     { id, name, description, price, imgUrl, categories[] }
OrderDTO       { items: OrderItemDTO[], get total() }
OrderItemDTO   { product, quantity, get subTotal() }
CategoryDTO    { id, name }
UserDTO        { id, name, email }
CredentialsDTO { username, password }
AccessTokenPayloadDTO { exp, user_name, authorities: RoleEnum[] }
```

## Variáveis de Ambiente (prefixo VITE_)

```env
VITE_BACKEND_URL    # URL do backend (default: heroku)
VITE_CLIENT_ID      # OAuth2 client id (default: myclientid)
VITE_CLIENT_SECRET  # OAuth2 client secret (default: myclientsecret)
```

## Padrões e Convenções

- **CSS-in-JS** com styled-components em todos os componentes e páginas
- **Responsivo:** `@media` queries com breakpoints 850px (tablet) e 600px / 420px (mobile)
- **Serviços:** cada entidade tem seu `*-service.ts` com funções de CRUD via `requestBackend()`
- **Componentes com pasta própria:** cada componente em `components/NomeComponente/index.tsx`
- **Rotas como pages:** cada página em `routes/Secao/NomePagina/index.tsx`
- Sem Redux — state management apenas via Context API + props

## Arquivos-chave

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/App.tsx` | Roteamento principal + providers de contexto |
| `src/main.tsx` | Entry point + GlobalStyle |
| `src/utils/requests.ts` | Axios base + interceptors |
| `src/utils/system.ts` | Constantes de configuração (BASE_URL, CLIENT_ID) |
| `src/utils/history.ts` | Instância do history para navegação imperativa |
| `src/services/auth-service.ts` | Login, decode JWT, validação de roles |
| `src/services/cart-service.ts` | Lógica de carrinho (add/remove/quantity) |
| `src/localstorage/cart-repository.ts` | Persistência do carrinho |
| `src/localstorage/access-token-repository.ts` | Persistência do token |
