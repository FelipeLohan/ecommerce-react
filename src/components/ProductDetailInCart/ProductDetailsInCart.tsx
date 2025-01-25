import styled from "styled-components";

const ProductDetailsInCartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #c2c2c2;
  padding: 20px;

  img {
    width: 40%;
  }
`;

const ProductCartInfo = styled.div`
  box-sizing: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  h3,
  p {
    font-size: 2vmin;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  div span {
    padding: 5px;
    border: 1px solid #000;
    border-radius: 12px;
    cursor: pointer;
  }
`;

const ProductCartPrice = styled.div`
  box-sizing: fit-content;
  display: flex;
  color: #0caf1d;
  font-size: 2.5vmin;
  align-items: center;
`;
const ProductCartInfoImageContainer = styled.div`
  display: flex;
  gap: 20px;
`;

type Props = {
  quantity: number,
  name: string,
  price: number,
  imgUrl: string,
  handleIncreaseClick: any
}

const ProductDetailsInCart = ({quantity, name, price, imgUrl, handleIncreaseClick}: Props) => {
  return (
    <>
      <ProductDetailsInCartContainer>
        <ProductCartInfoImageContainer>
          <img src={imgUrl} alt={name} />
          <ProductCartInfo>
            <h3>{name}</h3>
            <div>
              <span>-</span>
              <p>{quantity}</p>
              <span onClick={handleIncreaseClick}>+</span>
            </div>
          </ProductCartInfo>
        </ProductCartInfoImageContainer>
        <ProductCartPrice>
          <p>{(price * quantity).toFixed(2)}</p>
        </ProductCartPrice>
      </ProductDetailsInCartContainer>
    </>
  );
};

export { ProductDetailsInCart };
