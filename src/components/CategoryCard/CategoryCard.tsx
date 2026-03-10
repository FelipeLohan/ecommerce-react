import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const CategoryCardContainer = styled.span`
  padding: 8px 20px;
  color: #fff;
  background-color: #636363;
  border-radius: 8px;
  font-size: ${tokens.fontSize.xs};
  
  @media (max-width: 600px) {
   font-size: ${tokens.fontSize.base};
}

@media (max-width: 420px){
   font-size: ${tokens.fontSize.lg};
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