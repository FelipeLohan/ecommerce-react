import styled from "styled-components";
import NotebookImg from "../../assets/NotebookImg.png";
import TrashIcon from "../../assets/TrashIcon.svg";
import PenIcon from "../../assets/PenIcon.svg";

const ProductCardContainer = styled.div`

`;

const ProductCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
`;

const ProductInfosContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const ProductEditTrashIcons = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px 40px;

  img {
    width: 50%;
  }
`;

const ProductAdminListCard = () => {
  return (
    <>
      <ProductCardContainer>
        <ProductCardContent>
          <ProductInfosContainer>
            <p>314</p>
            <img src={NotebookImg} />
            <p>R$ 5000,00</p>
            <p>Computador Gamer XT</p>
          </ProductInfosContainer>
          <ProductEditTrashIcons>
            <img src={PenIcon} />
            <img src={TrashIcon} />
          </ProductEditTrashIcons>
        </ProductCardContent>
      </ProductCardContainer>
    </>
  );
};

export { ProductAdminListCard };
