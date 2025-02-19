import styled from "styled-components";

const CategoryCardContainer = styled.span`
  padding: 8px 20px;
  color: #fff;
  background-color: #636363;
  border-radius: 8px;
  font-size: 1.7vmin;
  
  @media (max-width: 600px) {
   font-size: 2.2vmin;
}

@media (max-width: 420px){
   font-size: 2.5vmin;
}
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