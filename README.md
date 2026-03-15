# Ecommerce React

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/FelipeLohan/ecommerce-react/blob/main/LICENSE)

Aplicação de e-commerce full-featured desenvolvida com **React** e **TypeScript**, com foco em boas práticas de arquitetura frontend e integração com API REST.

**Demo:** https://ecommerce-lohan.netlify.app/

## Funcionalidades

### Área do cliente
- Catálogo de produtos com filtro por categoria e busca por nome
- Página de detalhes do produto
- Carrinho de compras — adicionar, remover e ajustar quantidades
- Finalização de pedido com página de confirmação
- Cadastro e login de usuários
- Área "Minha Conta" para usuários autenticados

### Área administrativa (ROLE_ADMIN)
- Dashboard administrativo
- CRUD completo de produtos (listagem, cadastro, edição, exclusão)
- CRUD completo de categorias

### Autenticação
- OAuth2 com JWT armazenado em localStorage
- Rotas protegidas por role (`ROLE_CLIENT`, `ROLE_ADMIN`)
- Redirecionamento automático em respostas 401/403

## Screenshots

![Catálogo](https://imgur.com/L5BdIdw.png)

![Carrinho](https://imgur.com/TYzS4Wy.png)

## Stack

### Frontend
- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- React Router DOM v6
- Axios
- jwt-decode

### Backend
- Java + Spring Boot
- JPA / Hibernate
- Maven
- MySQL

### Deploy
- Frontend: Netlify
- Backend: Heroku

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_BACKEND_URL=https://ecommerce-spring-ec44b57ed84d.herokuapp.com
VITE_CLIENT_ID=myclientid
VITE_CLIENT_SECRET=myclientsecret
```

## Estrutura do projeto

```
src/
├── components/       # Componentes reutilizáveis de UI
├── routes/
│   ├── ClientHome/   # Catálogo, Produto, Carrinho, Login, Cadastro, Conta
│   └── Admin/        # Dashboard, Produtos, Categorias
├── models/           # Interfaces e tipos TypeScript
├── services/         # Chamadas à API (axios)
├── utils/            # Contextos, helpers, configurações
└── localstorage/     # Persistência de carrinho e token
```

## Autor

**Felipe Lohan**

https://www.linkedin.com/in/felipe-lohan-767294213/
