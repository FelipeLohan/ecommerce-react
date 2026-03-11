# Etapa 03 — Integrar filtro no Catalog.tsx

## Arquivo
`src/routes/ClientHome/Catalog/Catalog.tsx`

## Mudanças

### 1. Atualizar tipo QueryParams
```ts
type QueryParams = {
  page: number;
  name: string;
  categoryId: number;   // <-- novo
};
```

### 2. Estado inicial
```ts
const [queryParams, setQueryParam] = useState<QueryParams>({
  page: 0,
  name: "",
  categoryId: 0,        // <-- novo (0 = Todas)
});
```

### 3. Atualizar chamada ao service
```ts
productService.findPageRequest(
  queryParams.page,
  queryParams.name,
  queryParams.categoryId,  // <-- novo
)
```

### 4. Handler de categoria
```ts
function handleCategoryChange(categoryId: number) {
  setProducts([]);
  setQueryParam({ page: 0, name: queryParams.name, categoryId });
}
```

### 5. Inserir CategoryFilter no JSX
Posicionar entre a SearchInput e o grid de produtos:
```tsx
<SearchInputContainerMargin>
  <SearchInput onSearch={handleSearch} />
</SearchInputContainerMargin>

<CategoryFilterContainerMargin>
  <CategoryFilter
    selectedId={queryParams.categoryId}
    onChange={handleCategoryChange}
  />
</CategoryFilterContainerMargin>

<ProductsCardsGridContainer>
  ...
</ProductsCardsGridContainer>
```

`CategoryFilterContainerMargin`: `margin-top: tokens.spacing[4]`

## Notas
- Ao mudar categoria, manter o texto de busca atual (não resetar name)
- Ao fazer nova busca por nome, manter categoria selecionada
- `page` sempre volta a 0 ao trocar qualquer filtro
