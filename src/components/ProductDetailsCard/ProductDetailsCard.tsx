import styled from 'styled-components'
import { CategoryCard } from '../CategoryCard'
import { ProductDTO } from '../../models/product'

const ProductDetailsCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 40px 20px;
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  border-radius: 12px;
`

const ProductImageContainer = styled.div`
  box-sizing: fit-content;
  margin: 0 auto;
  width: 50%;

  @media (max-width: 600px) {
   width: 50%;
}
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


@media (max-width: 600px) {
   h3{
    font-size: 3.5vmin;
    color: #0CAF1D;
  }

  h4{
    font-size: 3vmin;
    color: #636363;
  }
  
  p{
    font-size: 2.5vmin;
    color: #636363;
  }
}

@media (max-width: 420px){
   h3{
    font-size: 4.5vmin;
    color: #0CAF1D;
  }

  h4{
    font-size: 4vmin;
    color: #636363;
  }
  
  p{
    font-size: 3vmin;
    color: #636363;
  }
}
`

const ProductCardCategoryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  width: 100%;
`

type Props = {
  product: ProductDTO;
}



const ProductDetailsCard = ({product}: Props) => {
  return(
    <>
    <ProductDetailsCardContainer>
      <ProductImageContainer>
        <img src={product.imgUrl} />
      </ProductImageContainer>
      <ProductInfoContainer>
        <h3>R$ {product.price}</h3>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </ProductInfoContainer>
      <ProductCardCategoryContainer>
        {product.categories.map(e => {
          return <CategoryCard key={e.name} name={e.name} />
        })}
      </ProductCardCategoryContainer>
    </ProductDetailsCardContainer>
    </>
  )
}

export { ProductDetailsCard }