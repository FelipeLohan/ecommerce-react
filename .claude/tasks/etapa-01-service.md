# Etapa 01 — Atualizar product-service.ts

## Arquivo
`src/services/product-service.ts`

## O que mudar

Adicionar `categoryId: number` como parâmetro em `findPageRequest()` e
incluí-lo nos `params` do axios.

### Antes
```ts
export function findPageRequest(
  page: number,
  name: string,
  size?: number,
  sort?: string,
) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/products",
    params: {
      page,
      name,
      size: size ?? 12,
      sort: sort ?? "name"
    },
  };
  return requestBackend(config);
}
```

### Depois
```ts
export function findPageRequest(
  page: number,
  name: string,
  categoryId: number,
  size?: number,
  sort?: string,
) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/products",
    params: {
      page,
      name,
      categoryId,
      size: size ?? 12,
      sort: sort ?? "name"
    },
  };
  return requestBackend(config);
}
```

## Notas
- `categoryId = 0` desabilita o filtro no backend (sem necessidade de omitir o param)
- Nenhuma outra chamada usa `findPageRequest` além do `Catalog.tsx`
