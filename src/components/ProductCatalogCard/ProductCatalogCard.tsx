import styled from "styled-components";
import { ProductDTO } from "../../models/product";
import { CategoryCard } from "../CategoryCard/CategoryCard.tsx";
import { tokens } from "../../styles/tokens.ts";
import { ShoppingCart } from "lucide-react";

const CardImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
  transition: transform ${tokens.transition.slow};
`;

const DetailsButton = styled.div`
  padding: 8px 0;
  background: ${tokens.colors.primary[600]};
  color: #ffffff;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  text-align: center;
  border-radius: ${tokens.radius.md};
  transition: background ${tokens.transition.base};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing[2]};

  svg {
    opacity: 0;
    width: 0;
    transition: opacity ${tokens.transition.fast}, width ${tokens.transition.fast};
  }

  &:hover {
    background: ${tokens.colors.primary[700]};
  }
`;

const CardContainer = styled.div`
  background: #ffffff;
  border: 1px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.md};
  box-shadow: ${tokens.shadow.sm};
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow ${tokens.transition.base}, transform ${tokens.transition.base};
  display: flex;
  flex-direction: column;
  width: 100%;

  &:hover {
    box-shadow: ${tokens.shadow.md};
    transform: translateY(-3px);
  }

  &:hover ${CardImage} {
    transform: scale(1.03);
  }

  &:hover ${DetailsButton} svg {
    opacity: 1;
    width: 15px;
  }
`;

const CardBody = styled.div`
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const ProductName = styled.h4`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[700]};
  line-height: ${tokens.lineHeight.snug};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Price = styled.p`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  margin: 4px 0 2px;
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
        <DetailsButton>
          <ShoppingCart size={15} />
          Comprar
        </DetailsButton>
      </CardBody>
    </CardContainer>
  );
};

export { ProductCatalogCard };
