# Etapa 01 — Atualizar product-service.ts

## Arquivo
`src/services/product-service.ts`

## Problema atual
O parâmetro `sort` em `findPageRequest` tem default hardcoded `"name"`,
sem possibilidade de controle externo real (o caller não o usa).

## Mudança
Tornar `sort` um parâmetro sem default fixo — o caller passa o valor
desejado diretamente. Manter assinatura compatível com o uso existente.

### Antes
```ts
export function findPageRequest(
  page: number,
  name: string,
  categoryId: number,
  size?: number,
  sort?: string,   // ignorado — sempre cai no default "name"
)
  params: { ..., sort: sort ?? "name" }
```

### Depois
```ts
export function findPageRequest(
  page: number,
  name: string,
  categoryId: number,
  sort: string,    // obrigatório — quem chama decide
  size?: number,
)
  params: { ..., sort }
```

## Impacto
- `Catalog.tsx` → passa o estado `sort`
- `ProductListing.tsx` (admin) → passa `"name,asc"` como default fixo
