# Etapa 02 — Página Minha Conta

**Arquivos a criar:**
- `src/routes/ClientHome/MyAccount/index.tsx`
- `src/routes/ClientHome/MyAccount/MyAccount.tsx`

## Layout
Página centralizada com um card contendo os dados do usuário.
Não usa split-screen (não é formulário de auth) — layout simples e limpo.

## Dados exibidos
Vindos de `GET /users/me` via `userService.findMe()`:
- `name` — nome completo
- `email` — endereço de e-mail
- `id` — ID do usuário (discreto, texto pequeno)

## Estrutura visual

```
Page (fundo surface.page, min-height 100vh, padding 48px 16px)
  └── Card (max-width 480px, centralizado, shadow, radius xl)
        ├── CardHeader
        │     ├── AvatarLarge (72px, inicial, azul)
        │     └── UserName (h1 grande)
        ├── Divider
        ├── InfoRow (ícone + label + valor) × 2
        │     ├── Mail icon + "E-mail" + valor
        │     └── Hash icon + "ID" + valor
        └── BackLink (link "← Voltar ao catálogo")
```

## Imports
```typescript
import * as userService from "../../../services/user-service.ts";
import { UserDTO } from "../../../models/user.ts";
import { Mail, Hash } from "lucide-react";
import { Link } from "react-router-dom";
```

## Lógica
```typescript
const [user, setUser] = useState<UserDTO>();

useEffect(() => {
  userService.findMe().then((res) => setUser(res.data));
}, []);
```

## Estado de carregamento
Enquanto `user` for `undefined`, exibir um placeholder sutil
(skeleton ou texto "Carregando...") para evitar layout shift.

## Status
- [x] Implementado
