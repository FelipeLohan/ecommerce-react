import styled from "styled-components";
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

  p {
    font-size: 2.2vmin;
  }

  img{
    width: 20%;
  }
`;

const ProductEditTrashIcons = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px 40px;

  

  img {
    width: 50%;
    cursor: pointer;
  }
`;

type Props = {
  id: number,
  name: string,
  price: number,
  imgUrl: string,
  onDeleteClick: Function
}

const ProductAdminListCard = ({id, name, price, imgUrl, onDeleteClick}: Props) => {
  return (
    <>
      <ProductCardContainer>
        <ProductCardContent>
          <ProductInfosContainer>
            <p>{id}</p>
            <img src={imgUrl} alt={name} />
            <p>R$ {price.toFixed(2)}</p>
            <p>{name}</p>
          </ProductInfosContainer>
          <ProductEditTrashIcons>
            <img src={PenIcon} />
            <img onClick={onDeleteClick} src={TrashIcon} />
          </ProductEditTrashIcons>
        </ProductCardContent>
      </ProductCardContainer>
    </>
  );
};

export { ProductAdminListCard };
