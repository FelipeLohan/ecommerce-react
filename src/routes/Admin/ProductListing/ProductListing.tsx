import styled from "styled-components";
import { CtaButton } from "../../../components/CtaButton";
import { SearchInput } from "../../../components/SearchInput";
import { ProductAdminListCard } from "../../../components/ProductAdminListCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { useEffect, useState } from "react";
import * as productService from "../../../services/product-service.ts";
import { ProductDTO } from "../../../models/product";
import { DialogInfo } from "../../../components/DialogInfo/DialogInfo.tsx";

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

const CtaLoadMoreContainerMargin = styled.div`
  margin-top: 20px;
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

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Sucesso!"
  })

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

  function handleDialogInfoClose(e: any){
    e.preventDefault()
    setDialogInfoData({...dialogInfoData , visible: false})
  }

  function handleDeleteClick(){
    setDialogInfoData({...dialogInfoData , visible: true})
  }


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
        <SearchInput onSearch={handleSearch} />
      </SearchBarContainer>

      <ProductListContainer>
        <ProductListContent>
          {products.map((e) => (
            <ProductAdminListCard
              key={e.id}
              id={e.id}
              name={e.name}
              price={e.price}
              imgUrl={e.imgUrl}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </ProductListContent>
      </ProductListContainer>
      { 
              !isLast && (
              <CtaLoadMoreContainerMargin onClick={handleNextPage}>
                <CtaLoadMore />
              </CtaLoadMoreContainerMargin>
            )
      }
      {
        dialogInfoData.visible &&
        <DialogInfo message={dialogInfoData.message} onDialogClose={handleDialogInfoClose} />
      }
      
    </>
  );
};

export { ProductListing };
