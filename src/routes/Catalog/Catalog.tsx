import styled from "styled-components";
import { HeaderClient } from "../../components/HeaderClient";
import { SearchInput } from "../../components/SearchInput";
import { ProductCatalogCard } from "../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../components/CtaLoadMore";

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

const Catalog = () => {
  return (
    <>
      <HeaderClient />
      <SearchInputContainerMargin>
        <SearchInput />
      </SearchInputContainerMargin>
      <ProductsCardsGridContainer>
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
        <ProductCatalogCard />
      </ProductsCardsGridContainer>
      <CtaLoadMoreContainerMargin>
        <CtaLoadMore />
      </CtaLoadMoreContainerMargin>
    </>
  );
};

export { Catalog };
