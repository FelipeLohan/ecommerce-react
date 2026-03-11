# Plano — Ordenação de Produtos no Catálogo

## Objetivo
Permitir que o usuário ordene os produtos por nome (A-Z, Z-A) ou preço
(menor → maior, maior → menor) usando o query param `sort` que o backend
já suporta.

## Valores de sort aceitos pelo backend
| Opção | sort param |
|-------|-----------|
| Nome A-Z | `name,asc` |
| Nome Z-A | `name,desc` |
| Menor preço | `price,asc` |
| Maior preço | `price,desc` |

## Etapas

| # | Arquivo(s) | O que fazer |
|---|-----------|-------------|
| 01 | `product-service.ts` | Substituir `sort` hardcoded por parâmetro dinâmico |
| 02 | `Catalog.tsx` | Adicionar estado `sort`, toolbar com `<select>` e integrar na chamada |

## Resultado esperado
Toolbar entre os chips de categoria e o grid com um `<select>` de ordenação.
Ao trocar a opção, reseta para page=0 e rebusca com o novo `sort`.

```
[ Todas ]  [ Livros ]  [ Eletrônicos ]   ...chips de categoria...

Ordenar por: [ Nome A-Z ▾ ]              ← novo select

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│      │ │      │ │      │ │      │
└──────┘ └──────┘ └──────┘ └──────┘
```
