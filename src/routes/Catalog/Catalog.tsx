import styled from "styled-components";
import { HeaderClient } from "../../components/HeaderClient";
import { SearchInput } from "../../components/SearchInput";
import { ProductCatalogCard } from "../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../components/CtaLoadMore";
import { ProductDTO } from "../../models/product";

const ProductsCardsGridContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const SearchInputContainerMargin = styled.div`
  margin-top: 40px;
`;

const CtaLoadMoreContainerMargin = styled.div`
  margin-top: 20px;
`;

const product: ProductDTO = {
  id: 1,
  name: "SmartTV Samsung 4k",
  description:
    "Smart TV da Samsung modelo 4k, 120hz, com 48 polegadas de imagem",
  price: 2900,
  imgUrl:
    "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/refs/heads/master/backend/img/2-big.jpg",
  categories: [
    {
      id: 1,
      name: "Eletrônicos",
    },
    {
      id: 2,
      name: "Computadores",
    },
  ],
};

const Catalog = () => {
  return (
    <>
      <HeaderClient />
      <SearchInputContainerMargin>
        <SearchInput />
      </SearchInputContainerMargin>
      <ProductsCardsGridContainer>
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
        <ProductCatalogCard product={product} />
      </ProductsCardsGridContainer>
      <CtaLoadMoreContainerMargin>
        <CtaLoadMore />
      </CtaLoadMoreContainerMargin>
    </>
  );
};

export { Catalog };
