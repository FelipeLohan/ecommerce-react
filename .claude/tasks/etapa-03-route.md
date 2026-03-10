# Etapa 03 — Rota /my-account no App.tsx

**Arquivo:** `src/App.tsx`

## O que fazer
Registrar a rota `/my-account` protegida por `PrivateRoute` dentro
do bloco de rotas de `ClientHome`.

## Import a adicionar
```typescript
import { MyAccount } from "./routes/ClientHome/MyAccount";
```

## Rota a adicionar (dentro do `<Route path="/" element={<ClientHome />}>`)
```tsx
<Route
  path="/my-account"
  element={
    <PrivateRoute>
      <MyAccount />
    </PrivateRoute>
  }
/>
```

## Posicionamento sugerido
Logo após `<Route path="/register" element={<Register />} />`.

## Observações
- Rota **privada** — usuário não autenticado é redirecionado para `/login`
- `PrivateRoute` sem `roles` significa qualquer usuário autenticado tem acesso

## Status
- [x] Implementado
