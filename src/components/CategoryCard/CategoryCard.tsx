import styled from "styled-components";

const CategoryCardContainer = styled.span`
  padding: 8px 20px;
  color: #fff;
  background-color: #636363;
  border-radius: 8px;
  font-size: 1.7vmin;
`

type Props = {
  name: string;
}

const CategoryCard = ({name}: Props) => {
  return (
    <>
      <CategoryCardContainer>
        {name}
      </CategoryCardContainer>
    </>
  )
}

export { CategoryCard }