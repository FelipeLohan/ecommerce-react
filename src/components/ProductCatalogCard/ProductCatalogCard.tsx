import styled from "styled-components";

import { ProductDTO } from "../../models/product";

const ProductCatalogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background-color: #fff;
  width: 100%;
  border-radius: 8px;
`;

const ImageCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 850px) {
    img {
      width: 150px;
    }
  }
`;

const InfoCardContainer = styled.div`
  h3 {
    font-size: 2.5vmin;
    color: #0caf1d;
    margin-bottom: 5px;
  }
  h4 {
    font-size: 2vmin;
    color: #636363;
  }

  @media (max-width: 600px) {
    h3{
      font-size: 3.5vmin;
    }

     h4{
      font-size: 3vmin;
    }
  }

  @media (max-width: 420px){
  h3 {
    font-size: 5vmin;
    color: #0caf1d;
    margin-bottom: 5px;
  }
  h4 {
    font-size: 4vmin;
    color: #636363;
  }
}
`;

type Props = {
  product: ProductDTO;
};

const ProductCatalogCard = ({ product }: Props) => {
  return (
    <>
      <ProductCatalogCardContainer>
        <ImageCardContainer>
          <img src={product.imgUrl} />
        </ImageCardContainer>
        <span></span>
        <InfoCardContainer>
          <h3>R$ {product.price}</h3>
          <h4>{product.name}</h4>
        </InfoCardContainer>
      </ProductCatalogCardContainer>
    </>
  );
};

export { ProductCatalogCard };
