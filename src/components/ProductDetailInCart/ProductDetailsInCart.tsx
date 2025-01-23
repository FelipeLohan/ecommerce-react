import styled from "styled-components";
import NotebookProductImg from "../../assets/NotebookProductImg.png";

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

const ProductDetailsInCart = () => {
  return (
    <>
      <ProductDetailsInCartContainer>
        <ProductCartInfoImageContainer>
          <img src={NotebookProductImg} alt="NotebookProduct" />
          <ProductCartInfo>
            <h3>Computador Gamer XT</h3>
            <div>
              <span>-</span>
              <p>1</p>
              <span>+</span>
            </div>
          </ProductCartInfo>
        </ProductCartInfoImageContainer>
        <ProductCartPrice>
          <p>R$ 5000,00</p>
        </ProductCartPrice>
      </ProductDetailsInCartContainer>
    </>
  );
};

export { ProductDetailsInCart };
