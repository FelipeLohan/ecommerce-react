import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

/* ── Item card ───────────────────────────────────────────── */
const ItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid ${tokens.colors.neutral[100]};
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.sm};
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${tokens.radius.md};
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const ItemName = styled.p`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[800]};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemUnitPrice = styled.p`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.neutral[500]};
  margin: 0;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const QtyBtn = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.md};
  background: #ffffff;
  font-size: ${tokens.fontSize.base};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[600]};
  cursor: pointer;
  transition: border-color ${tokens.transition.fast}, background ${tokens.transition.fast},
    color ${tokens.transition.fast};
  line-height: 1;

  &:hover {
    border-color: ${tokens.colors.primary[400]};
    background: ${tokens.colors.primary[50]};
    color: ${tokens.colors.primary[600]};
  }
`;

const QtyValue = styled.span`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[800]};
  min-width: 28px;
  text-align: center;
`;

const ItemPrice = styled.p`
  font-size: ${tokens.fontSize.base};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  min-width: 80px;
  text-align: right;
  margin: 0;
  flex-shrink: 0;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: ${tokens.colors.neutral[400]};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color ${tokens.transition.fast};
  flex-shrink: 0;

  &:hover {
    color: ${tokens.colors.danger[500]};
  }
`;

/* ── Types ───────────────────────────────────────────────── */
type Props = {
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
  handleIncreaseClick: () => void;
  handleDecreaseClick: () => void;
};

/* ── Component ───────────────────────────────────────────── */
const ProductDetailsInCart = ({
  quantity,
  name,
  price,
  imgUrl,
  handleIncreaseClick,
  handleDecreaseClick,
}: Props) => {
  return (
    <ItemCard>
      <ItemImage src={imgUrl} alt={name} />

      <ItemInfo>
        <ItemName>{name}</ItemName>
        <ItemUnitPrice>R$ {price.toFixed(2)} cada</ItemUnitPrice>
        <QtyRow>
          <QtyBtn onClick={handleDecreaseClick} aria-label="Diminuir">
            −
          </QtyBtn>
          <QtyValue>{quantity}</QtyValue>
          <QtyBtn onClick={handleIncreaseClick} aria-label="Aumentar">
            +
          </QtyBtn>
        </QtyRow>
      </ItemInfo>

      <ItemPrice>R$ {(price * quantity).toFixed(2)}</ItemPrice>

      <RemoveButton onClick={handleDecreaseClick} aria-label="Remover item" title="Remover">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </RemoveButton>
    </ItemCard>
  );
};

export { ProductDetailsInCart };
