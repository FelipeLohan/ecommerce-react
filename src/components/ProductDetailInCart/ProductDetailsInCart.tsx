import styled from "styled-components";
import NotebookProductImg from "../../assets/NotebookProductImg.png"

const ProductDetailsInCartContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #c2c2c2;
`

const ProductCartInfo = styled.div`
  box-sizing: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3, p{
    font-size: 2vmin;
  }
`

const ProductDetailsInCart = () => {
  return(
    <>
    <ProductDetailsInCartContainer>
      <div>
        <img src={NotebookProductImg} alt="NotebookProduct" />
        <ProductCartInfo>
          <h3>Computador Gamer XT</h3>
          <p>1</p>
        </ProductCartInfo>
      </div>
    </ProductDetailsInCartContainer>
    </>
  )
}

export { ProductDetailsInCart }