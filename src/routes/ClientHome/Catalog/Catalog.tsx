import styled from "styled-components";
import { SearchInput } from "../../../components/SearchInput";
import { ProductCatalogCard } from "../../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import * as productService from "../../../services/product-service.ts";
import { Link } from "react-router-dom";

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
      <SearchInputContainerMargin>
        <SearchInput />
      </SearchInputContainerMargin>
      <ProductsCardsGridContainer>
        {productService.findAll().map((product) => (
          <Link to={`/product-details/${product.id}`}>
            <ProductCatalogCard key={product.id} product={product} />
          </Link>
        ))}
      </ProductsCardsGridContainer>
      <CtaLoadMoreContainerMargin>
        <CtaLoadMore />
      </CtaLoadMoreContainerMargin>
    </>
  );
};

export { Catalog };
