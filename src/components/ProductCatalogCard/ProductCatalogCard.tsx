import styled from "styled-components";
import { ProductDTO } from "../../models/product";
import { CategoryCard } from "../CategoryCard/CategoryCard.tsx";
import { tokens } from "../../styles/tokens.ts";

const DetailsButton = styled.div`
  margin-top: ${tokens.spacing[1]};
  padding: 8px 0;
  background: ${tokens.colors.primary[600]};
  color: #ffffff;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  text-align: center;
  border-radius: ${tokens.radius.md};
  opacity: 0;
  transform: translateY(6px);
  transition: opacity ${tokens.transition.base}, transform ${tokens.transition.base};
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform ${tokens.transition.slow};
`;

const CardContainer = styled.div`
  background: #ffffff;
  border: 1px solid ${tokens.colors.neutral[100]};
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.sm};
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow ${tokens.transition.base}, transform ${tokens.transition.base};
  display: flex;
  flex-direction: column;
  width: 100%;

  &:hover {
    box-shadow: ${tokens.shadow.lg};
    transform: translateY(-4px);
  }

  &:hover ${CardImage} {
    transform: scale(1.03);
  }

  &:hover ${DetailsButton} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardBody = styled.div`
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const ProductName = styled.h4`
  font-size: ${tokens.fontSize.base};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[800]};
  line-height: ${tokens.lineHeight.snug};
  margin: 0;
`;

const CategoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Price = styled.p`
  font-size: ${tokens.fontSize.xl};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.primary[600]};
  margin: 4px 0 0;
`;

type Props = {
  product: ProductDTO;
};

const ProductCatalogCard = ({ product }: Props) => {
  return (
    <CardContainer>
      <CardImage src={product.imgUrl} alt={product.name} />
      <CardBody>
        <ProductName>{product.name}</ProductName>
        {product.categories?.length > 0 && (
          <CategoriesRow>
            {product.categories.map((cat) => (
              <CategoryCard key={cat.id} name={cat.name} />
            ))}
          </CategoriesRow>
        )}
        <Price>R$ {product.price.toFixed(2)}</Price>
        <DetailsButton>Ver detalhes</DetailsButton>
      </CardBody>
    </CardContainer>
  );
};

export { ProductCatalogCard };
