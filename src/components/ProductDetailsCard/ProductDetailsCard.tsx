import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CategoryCard } from "../CategoryCard";
import { CtaButton } from "../CtaButton";
import { ProductDTO } from "../../models/product";
import { tokens } from "../../styles/tokens.ts";

/* ── Page wrapper ─────────────────────────────────────── */
const PageWrapper = styled.section`
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;

  @media (max-width: ${tokens.breakpoint.md}) {
    grid-template-columns: 1fr;
    gap: 24px;
    margin: 24px auto;
  }
`;

/* ── Left panel — Image ───────────────────────────────── */
const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.md};
  display: block;
`;

/* ── Right panel — Info ───────────────────────────────── */
const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Breadcrumb = styled.nav`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[400]};

  a {
    color: ${tokens.colors.neutral[400]};
    text-decoration: none;

    &:hover {
      color: ${tokens.colors.primary[600]};
    }
  }

  span {
    margin: 0 6px;
  }
`;

const CategoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProductName = styled.h1`
  font-size: ${tokens.fontSize["3xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  line-height: ${tokens.lineHeight.snug};
  margin: 0;
`;

const Price = styled.p`
  font-size: ${tokens.fontSize["4xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.primary[600]};
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${tokens.colors.neutral[100]};
  margin: 4px 0;
`;

const Description = styled.p`
  font-size: ${tokens.fontSize.base};
  color: ${tokens.colors.neutral[600]};
  line-height: ${tokens.lineHeight.relaxed};
  margin: 0;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityLabel = styled.span`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[700]};
`;

const QtyButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.md};
  background: #ffffff;
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[700]};
  cursor: pointer;
  transition: border-color ${tokens.transition.fast}, background ${tokens.transition.fast},
    color ${tokens.transition.fast};
  line-height: 1;

  &:hover {
    border-color: ${tokens.colors.primary[500]};
    background: ${tokens.colors.primary[50]};
    color: ${tokens.colors.primary[600]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const QtyValue = styled.span`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[800]};
  min-width: 32px;
  text-align: center;
`;

const ActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

/* ── Component ────────────────────────────────────────── */
type Props = {
  product: ProductDTO;
  onBuy: (quantity: number) => void;
  onBack: () => void;
};

const ProductDetailsCard = ({ product, onBuy, onBack }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <PageWrapper>
      {/* Left — image */}
      <ProductImage src={product.imgUrl} alt={product.name} />

      {/* Right — info */}
      <InfoPanel>
        <Breadcrumb>
          <Link to="/">Início</Link>
          <span>›</span>
          <Link to="/">Catálogo</Link>
          <span>›</span>
          {product.name}
        </Breadcrumb>

        {product.categories?.length > 0 && (
          <CategoriesRow>
            {product.categories.map((cat) => (
              <CategoryCard key={cat.id} name={cat.name} />
            ))}
          </CategoriesRow>
        )}

        <ProductName>{product.name}</ProductName>
        <Price>R$ {product.price.toFixed(2)}</Price>

        <Divider />

        <Description>{product.description}</Description>

        <QuantityRow>
          <QuantityLabel>Quantidade:</QuantityLabel>
          <QtyButton
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Diminuir quantidade"
          >
            −
          </QtyButton>
          <QtyValue>{quantity}</QtyValue>
          <QtyButton
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar quantidade"
          >
            +
          </QtyButton>
        </QuantityRow>

        <ActionsColumn>
          <CtaButton variant="primary" fullWidth size="lg" onClick={() => onBuy(quantity)}>
            🛒 Adicionar ao carrinho
          </CtaButton>
          <CtaButton variant="secondary" fullWidth onClick={onBack}>
            ← Voltar ao catálogo
          </CtaButton>
        </ActionsColumn>
      </InfoPanel>
    </PageWrapper>
  );
};

export { ProductDetailsCard };
