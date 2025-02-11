import styled from "styled-components";
import { CtaButton } from "../../../components/CtaButton";
import { SearchInput } from "../../../components/SearchInput";
import { ProductAdminListCard } from "../../../components/ProductAdminListCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { useEffect, useState } from "react";
import * as productService from "../../../services/product-service.ts";
import { ProductDTO } from "../../../models/product";

const ProductListContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 20px;
`;

const NewProductContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const SearchBarContainer = styled.div`
  margin-bottom: 20px;
`;

const ProductListContent = styled.div`
  display: flex;
  flex-direction: column;
`;

type QueryParams = {
  page: number;
  name: string;
};

const ProductListing = () => {

  const [isLast, setIsLast] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParam] = useState<QueryParams>({
      page: 0,
      name: "",
    });

  useEffect(() => {
      productService
        .findPageRequest(queryParams.page, queryParams.name)
        .then((response) => {
          setIsLast(response.data.last);
          const nextPage = response.data.content;
          setProducts(products.concat(nextPage));
        });
    }, [queryParams]);

  return (
    <>
      <NewProductContainer>
        <h1>Contagem de produtos</h1>
        <CtaButton
          text="Novo"
          primaryColor="#fff"
          secondaryColor="#3483FA"
          handleClick={() => {}}
        />
      </NewProductContainer>

      <SearchBarContainer>
        <SearchInput onSearch={() => {}} />
      </SearchBarContainer>

      <ProductListContainer>
        <ProductListContent>
          {
            products.map(e => (
              <ProductAdminListCard id={e.id} name={e.name} price={e.price} imgUrl={e.imgUrl} />
            ))
          }
        </ProductListContent>
      </ProductListContainer>
      <CtaLoadMore />
    </>
  );
};

export { ProductListing };
