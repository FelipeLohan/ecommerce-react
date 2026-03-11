# Etapa 02 — Adicionar seletor de ordenação no Catalog.tsx

## Arquivo
`src/routes/ClientHome/Catalog/Catalog.tsx`

## Opções de ordenação
```ts
const SORT_OPTIONS = [
  { label: "Nome A-Z",      value: "name,asc"   },
  { label: "Nome Z-A",      value: "name,desc"  },
  { label: "Menor preço",   value: "price,asc"  },
  { label: "Maior preço",   value: "price,desc" },
] as const;

type SortValue = typeof SORT_OPTIONS[number]["value"];
```

## Novo estado
```ts
const [sort, setSort] = useState<SortValue>("name,asc");
```

## Reset ao trocar sort
```ts
useEffect(() => {
  setPage(0);
  setProducts([]);
}, [name, categoryId, sort]);
```

## Atualizar chamada
```ts
productService.findPageRequest(page, name, categoryId, sort)
```

## Handler
```ts
function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
  setSort(e.target.value as SortValue);
}
```

## JSX — nova Toolbar entre CategoryFilter e grid

```tsx
<ToolbarRow>
  <ResultCount>{products.length} produto(s) encontrado(s)</ResultCount>
  <SortSelect value={sort} onChange={handleSortChange}>
    {SORT_OPTIONS.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </SortSelect>
</ToolbarRow>
```

## Styled-components novos

```ts
ToolbarRow    // flex, justify-content: space-between, align-items: center
              // width: 90%, margin: spacing[4] auto 0
              // em mobile: flex-direction: column, align-items: flex-start

ResultCount   // font-size: sm, color: neutral[500]

SortSelect    // <select> estilizado: borda neutral[200], border-radius md,
              // padding: 6px 12px, font-size sm, cursor pointer,
              // focus: outline primary[400]
```

## Notas
- `ResultCount` só aparece após loading terminar e products.length > 0
- Toolbar não aparece no estado de empty state
