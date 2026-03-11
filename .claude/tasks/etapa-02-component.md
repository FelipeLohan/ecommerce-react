# Etapa 02 — Criar componente CategoryFilter

## Arquivo novo
`src/components/CategoryFilter/index.tsx`

## Responsabilidade
Renderizar chips clicáveis para cada categoria + chip "Todas".
Chip selecionado recebe destaque visual (background primário).

## Interface
```ts
type Props = {
  selectedId: number;           // 0 = Todas
  onChange: (id: number) => void;
};
```

## Comportamento
- Na montagem: faz GET /categories via `findAllRequest()` de category-service
- Renderiza chip "Todas" fixo com id=0 + um chip por categoria retornada
- Chip ativo: fundo `#4A90D9` (ou cor primária do projeto), texto branco
- Chip inativo: borda sutil, fundo transparente, hover com fundo claro
- Layout: flex wrap, scroll horizontal em mobile se necessário
- Sem estado interno de "selecionado" — controlado pelo pai via `selectedId`

## Exemplo de markup
```tsx
<FilterRow>
  <Chip $active={selectedId === 0} onClick={() => onChange(0)}>Todas</Chip>
  {categories.map(cat => (
    <Chip key={cat.id} $active={selectedId === cat.id} onClick={() => onChange(cat.id)}>
      {cat.name}
    </Chip>
  ))}
</FilterRow>
```

## Styled-components
- `FilterRow`: `display: flex; flex-wrap: wrap; gap: 8px; padding: 0 5%;`
- `Chip`: pill com border-radius 999px, padding 6px 16px, cursor pointer,
  transição de background e color, `$active` como transient prop
