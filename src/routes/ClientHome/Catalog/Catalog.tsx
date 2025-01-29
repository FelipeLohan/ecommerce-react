import styled from "styled-components";
import { SearchInput } from "../../../components/SearchInput";
import { ProductCatalogCard } from "../../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import * as productService from "../../../services/product-service.ts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";

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

type QueryParams = {
  page: number;
  name: string;
};

const Catalog = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParam] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        setIsLast(response.data.last);
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage));
      });
  }, [queryParams]);

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParam({ ...queryParams, page: 0, name: searchText });
  }

  function handleNextPage() {
    setQueryParam({ ...queryParams, page: queryParams.page + 1 });
  }

  return (
    <>
      <SearchInputContainerMargin>
        <SearchInput onSearch={handleSearch} />
      </SearchInputContainerMargin>
      <ProductsCardsGridContainer>
        {products.map((product) => (
          <Link to={`/product-details/${product.id}`}>
            <ProductCatalogCard key={product.id} product={product} />
          </Link>
        ))}
      </ProductsCardsGridContainer>

      { 
        !isLast && (
        <CtaLoadMoreContainerMargin onClick={handleNextPage}>
          <CtaLoadMore />
        </CtaLoadMoreContainerMargin>
      )}
    </>
  );
};

export { Catalog };
