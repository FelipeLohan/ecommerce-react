import styled from "styled-components";

const CategoryCardContainer = styled.span`
  padding: 8px 20px;
  color: #fff;
  background-color: #636363;
  border-radius: 8px;
  font-size: 2vmin;
`

const CategoryCard = () => {
  return (
    <>
      <CategoryCardContainer>
        Eletrônicos
      </CategoryCardContainer>
    </>
  )
}

export { CategoryCard }