import styled, { keyframes } from "styled-components";
import { SearchInput } from "../../../components/SearchInput";
import { ProductCatalogCard } from "../../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import * as productService from "../../../services/product-service.ts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";
import { tokens } from "../../../styles/tokens.ts";

const SearchInputContainerMargin = styled.div`
  margin-top: ${tokens.spacing[10]};
`;

const ProductsCardsGridContainer = styled.div`
  width: 90%;
  margin: ${tokens.spacing[8]} auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: ${tokens.breakpoint.md}) {
    gap: 16px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    width: 90%;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const CtaLoadMoreContainerMargin = styled.div`
  margin-top: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[10]};
`;

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const SkeletonCard = styled.div`
  background: linear-gradient(
    90deg,
    ${tokens.colors.neutral[100]} 25%,
    ${tokens.colors.neutral[200]} 50%,
    ${tokens.colors.neutral[100]} 75%
  );
  background-size: 200% 100%;
  border-radius: ${tokens.radius.lg};
  overflow: hidden;
  height: 360px;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const SKELETON_COUNT = 8;

type QueryParams = {
  page: number;
  name: string;
};

const Catalog = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [queryParams, setQueryParam] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    if (queryParams.page === 0) setIsLoading(true);

    productService
      .findPageRequest(queryParams.page, queryParams.name)
      .then((response) => {
        setIsLast(response.data.last);
        const nextPage = response.data.content;
        setProducts((prev) =>
          queryParams.page === 0 ? nextPage : prev.concat(nextPage)
        );
      })
      .finally(() => setIsLoading(false));
  }, [queryParams]);

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParam({ page: 0, name: searchText });
  }

  function handleNextPage() {
    setQueryParam((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  return (
    <>
      <SearchInputContainerMargin>
        <SearchInput onSearch={handleSearch} />
      </SearchInputContainerMargin>

      <ProductsCardsGridContainer>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : products.map((product) => (
              <CardLink key={product.id} to={`/product-details/${product.id}`}>
                <ProductCatalogCard product={product} />
              </CardLink>
            ))}
      </ProductsCardsGridContainer>

      {!isLoading && !isLast && (
        <CtaLoadMoreContainerMargin onClick={handleNextPage}>
          <CtaLoadMore />
        </CtaLoadMoreContainerMargin>
      )}
    </>
  );
};

export { Catalog };
