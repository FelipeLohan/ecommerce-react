# Plano — Filtro por Categoria no Catálogo

## Objetivo
Permitir que o usuário filtre produtos por categoria na tela de catálogo,
usando os query params `name` e `categoryId` que o backend já suporta.

## Etapas

| # | Arquivo(s) | O que fazer |
|---|-----------|-------------|
| 01 | `product-service.ts` | Adicionar `categoryId` em `findPageRequest()` |
| 02 | `CategoryFilter/` (novo componente) | Chips visuais de categoria (Todas + lista) |
| 03 | `Catalog.tsx` | Integrar componente + estado + chamada com filtro |

## Fluxo esperado
1. Catálogo carrega → busca categorias (GET /categories) e renderiza chips
2. "Todas" selecionado por padrão (categoryId = 0)
3. Usuário clica em chip → categoryId atualiza → produtos recarregam do zero (page=0)
4. Busca por nome continua funcionando combinada com o filtro de categoria
5. Ao trocar categoria, reset do nome na SearchInput (ou manter — decidir na etapa 03)
