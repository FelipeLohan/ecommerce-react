import styled from 'styled-components'
import NotebookProductImg from '../../assets/NotebookProductImg.png'
import { CategoryCard } from '../CategoryCard'

const ProductDetailsCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 40px 20px;
  width: 90%;
  margin: 0 auto;
  border-radius: 12px;
`

const ProductImageContainer = styled.div`
  box-sizing: fit-content;
  margin: 0 auto;
`

const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3{
    font-size: 3vmin;
    color: #0CAF1D;
  }

  h4{
    font-size: 2.2vmin;
    color: #636363;
  }
  
  p{
    font-size: 1.7vmin;
    color: #636363;
  }
`

const ProductCardCategoryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  width: 100%;
`

const ProductDetailsCard = () => {
  return(
    <>
    <ProductDetailsCardContainer>
      <ProductImageContainer>
        <img src={NotebookProductImg} />
      </ProductImageContainer>
      <ProductInfoContainer>
        <h3>R$5000,00</h3>
        <h4>Computador Gamer XT</h4>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error deserunt hic incidunt repudiandae saepe ipsa voluptate corporis reiciendis, quasi quia! Iure illo qui nostrum omnis veniam perspiciatis obcaecati repellat modi!</p>
      </ProductInfoContainer>
      <ProductCardCategoryContainer>
        <CategoryCard/>
        <CategoryCard/>
      </ProductCardCategoryContainer>
    </ProductDetailsCardContainer>
    </>
  )
}

export { ProductDetailsCard }