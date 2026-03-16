# Ecommerce React

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/FelipeLohan/ecommerce-react/blob/main/LICENSE)

Aplicação de e-commerce full-featured desenvolvida com **React** e **TypeScript**, com foco em boas práticas de arquitetura frontend e integração com API REST.

**Demo:** https://ecommerce.felipelohan.com/

---

## Funcionalidades

### Área do cliente
- Catálogo de produtos com filtro por categoria e busca por nome
- Seção de produtos em destaque na página inicial
- Página de detalhes do produto
- Carrinho de compras — adicionar, remover e ajustar quantidades
- Finalização de pedido com página de confirmação
- Cadastro e login de usuários
- Área "Minha Conta" para usuários autenticados

### Área administrativa (ROLE_ADMIN)
- Dashboard com atalhos rápidos (novo produto, gerenciar produtos, categorias, pedidos)
- CRUD completo de produtos (listagem, cadastro, edição, exclusão)
- CRUD completo de categorias
- Histórico de pedidos com busca por e-mail do cliente, expansão de itens e paginação
- Header responsivo com menu hambúrguer no mobile

### Autenticação
- OAuth2 com JWT armazenado em localStorage
- Rotas protegidas por role (`ROLE_CLIENT`, `ROLE_ADMIN`)
- Redirecionamento automático em respostas 401/403

---

## Stack

### Frontend
| Pacote | Versão |
|---|---|
| React | 18.3 |
| TypeScript | 5.6 |
| Vite | 6.0 |
| Tailwind CSS | v4.2 |
| react-router-dom | 6.30 |
| axios | 1.9 |
| jwt-decode | 3.1 |
| lucide-react | 0.577 |
| react-select | 5.10 |
| clsx + tailwind-merge | 2.1 / 3.5 |
| history | 5.3 |

### Backend
- Java + Spring Boot · JPA/Hibernate · Maven · MySQL
- Repositório: https://github.com/FelipeLohan/ecommerce-back

### Deploy
- Frontend: Netlify
- Backend: Heroku

---

## Como rodar localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # tsc -b && vite build
npm run preview  # preview do build
npm run lint     # ESLint
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_BACKEND_URL=https://ecommerce-spring-ec44b57ed84d.herokuapp.com
VITE_CLIENT_ID=myclientid
VITE_CLIENT_SECRET=myclientsecret
```

---

## Rotas

### Cliente
| Rota | Página |
|---|---|
| `/catalog` | Catálogo de produtos |
| `/product-details/:productId` | Detalhes do produto |
| `/cart` | Carrinho |
| `/login` | Login |
| `/register` | Cadastro |
| `/my-account` | Minha conta (protegida) |
| `/confirmation/:orderId` | Confirmação de pedido (protegida) |

### Admin (requer `ROLE_ADMIN`)
| Rota | Página |
|---|---|
| `/admin/home` | Dashboard com atalhos |
| `/admin/products` | Listagem de produtos |
| `/admin/products/:productId` | Formulário de produto (criar/editar) |
| `/admin/categories` | Listagem de categorias |
| `/admin/categories/:categoryId` | Formulário de categoria (criar/editar) |
| `/admin/orders` | Histórico de pedidos |

---

## Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis de UI
│   ├── HeaderClient/    # Header da área do cliente
│   ├── HeaderAdmin/     # Header admin com menu hambúrguer mobile
│   ├── LoggedUser/      # Avatar com dropdown de conta
│   ├── OrderStatusBadge/# Badge colorido de status do pedido
│   ├── OrderHistoryCard/# Card de pedido para mobile
│   ├── FeaturedProducts/# Seção de produtos em destaque
│   ├── SearchInput/     # Campo de busca reutilizável
│   ├── Pagination/      # Paginação
│   ├── CtaLoadMore/     # Botão "carregar mais"
│   ├── DialogConfirmation/ # Modal de confirmação
│   ├── Toast/           # Notificações toast
│   └── ...
├── routes/
│   ├── ClientHome/      # Catálogo, Produto, Carrinho, Login, Cadastro, Conta
│   └── Admin/           # Dashboard, Produtos, Categorias, Pedidos
├── models/              # Interfaces e tipos TypeScript (DTOs)
├── services/            # Chamadas à API via axios
├── utils/               # Contextos, helpers, configurações, history
├── localstorage/        # Persistência de carrinho e token
└── lib/                 # Utilitários (cn helper)
```

---

## Arquitetura

### Contextos globais
- `ContextToken` — payload do JWT do usuário autenticado
- `ContextCartQuantity` — quantidade de itens no carrinho

### HTTP / Axios
- Todas as requisições passam por `requestBackend()` em `src/utils/requests.ts`
- Injeta `BASE_URL` e header `Authorization: Bearer <token>` automaticamente
- Interceptors: 401 → `/login` · 403 → `/catalog`

### Formulários
- Helper `src/utils/forms.ts` com campos como objetos `{ value, invalid, message, ... }`
- Validação com feedback inline por campo

### Estilo
- **Tailwind CSS v4** com configuração CSS-first via `@theme` em `src/index.css`
- `cn()` em `src/lib/cn.ts` (clsx + tailwind-merge) para classes condicionais
- Design tokens em `src/styles/tokens.ts` (usado pelo `react-select`)
- Responsividade mobile-first: `sm:480px` · `md:768px` · `lg:1024px` · `xl:1280px`

---

## Autor

**Felipe Lohan**

https://www.linkedin.com/in/felipe-lohan-767294213/
