import styled from "styled-components";
import NotebookProductImg from "../../assets/NotebookProductImg.png";

const ProductCatalogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px;
  background-color: #fff;
  width: 15%;
  border-radius: 8px;
`;

const ImageCardContainer = styled.div`
  width: 100%;
`;

const InfoCardContainer = styled.div`
  h3{
    font-size: 2.5vmin;
    color: #0CAF1D;
    margin-bottom: 5px;
  }
    h4{
      font-size: 2vmin;
      color: #636363;
    }
`

const ProductCatalogCard = () => {
  return (
    <>
      <ProductCatalogCardContainer>
        <ImageCardContainer>
          <img src={NotebookProductImg} />
        </ImageCardContainer>
        <span></span>
        <InfoCardContainer>
          <h3>R$5000,00</h3>
          <h4>Computador Gamer XT</h4>
        </InfoCardContainer>
      </ProductCatalogCardContainer>
    </>
  );
};

export { ProductCatalogCard };
