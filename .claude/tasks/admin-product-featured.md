# Task: Campo isFeatured no formulário de produto

## Contexto
O backend adicionou suporte ao campo `isFeatured` nos endpoints de produto:
- `GET /products` e `GET /products/{id}` → retornam `isFeatured` na resposta
- `POST /products` e `PUT /products/{id}` → aceitam `isFeatured` no body (opcional, default `false`)

## Etapas

- [x] 1. Adicionar `isFeatured: boolean` ao tipo `ProductDTO` em `src/models/product.ts`
- [x] 2. Adicionar campo `isFeatured` ao `formData` em `ProductForm.tsx`
- [x] 3. Criar handler `handleCheckboxChange` para ler `e.target.checked`
- [x] 4. Renderizar seção "Visibilidade" com checkbox no formulário

## Arquivos alterados
- `src/models/product.ts`
- `src/routes/Admin/ProductForm/ProductForm.tsx`
