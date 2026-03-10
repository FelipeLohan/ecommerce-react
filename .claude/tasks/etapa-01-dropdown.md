# Etapa 01 — Dropdown no LoggedUser

**Arquivo:** `src/components/LoggedUser/LoggedUser.tsx`

## O que fazer
Substituir o comportamento atual do avatar (clique direto = logout) por um
dropdown com as opções "Minha conta" e "Sair".

## Comportamento
- Clique no avatar → abre/fecha o dropdown (estado `isOpen`)
- Clique fora do dropdown → fecha (listener `mousedown` no `document`)
- Tecla Escape → fecha o dropdown

## Novos styled components

```
AvatarWrapper   — position: relative (âncora do dropdown)
Avatar          — botão existente, sem mudança de visual
DropdownMenu    — position: absolute, top calc(100%+8px), right 0
                  background branco, border-radius, box-shadow, min-width 180px
                  animação fadeIn + translateY(-4px → 0)
DropdownItem    — botão/link, padding 10px 16px, hover fundo neutro[50]
DropdownDivider — border-top 1px neutral[100]
UserInfo        — área topo do dropdown: nome + email (pequeno, neutro[500])
```

## Imports a adicionar
```typescript
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
```

## Lógica do componente

```typescript
const [isOpen, setIsOpen] = useState(false);
const wrapperRef = useRef<HTMLDivElement>(null);

// fechar ao clicar fora
useEffect(() => {
  function handleOutsideClick(e: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }
  document.addEventListener("mousedown", handleOutsideClick);
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, []);

function handleLogout() {
  authService.logout();
  setContextTokenPayload(undefined);
  setIsOpen(false);
}

function handleMyAccount() {
  setIsOpen(false);
  navigate("/my-account");
}
```

## JSX do dropdown

```tsx
<AvatarWrapper ref={wrapperRef}>
  <Avatar onClick={() => setIsOpen(o => !o)}>
    {initial}
  </Avatar>

  {isOpen && (
    <DropdownMenu>
      <UserInfo>
        <span>{contextTokenPayload.user_name}</span>
      </UserInfo>
      <DropdownDivider />
      <DropdownItem onClick={handleMyAccount}>
        <User size={15} /> Minha conta
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem $danger onClick={handleLogout}>
        <LogOut size={15} /> Sair
      </DropdownItem>
    </DropdownMenu>
  )}
</AvatarWrapper>
```

## Status
- [x] Implementado
