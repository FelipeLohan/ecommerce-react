import styled from "styled-components";
import { CtaButton } from "../../../components/CtaButton";
import { SearchInput } from "../../../components/SearchInput";
import { ProductAdminListCard } from "../../../components/ProductAdminListCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";

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

const ProductListing = () => {
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
          <ProductAdminListCard />
          <ProductAdminListCard />
          <ProductAdminListCard />
          <ProductAdminListCard />
        </ProductListContent>
      </ProductListContainer>
      <CtaLoadMore />
    </>
  );
};

export { ProductListing };
