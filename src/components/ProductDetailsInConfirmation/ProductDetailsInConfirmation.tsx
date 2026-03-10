import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 28px;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};

  &:last-child {
    border-bottom: none;
  }
`;

const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: ${tokens.radius.md};
  flex-shrink: 0;
  border: 1px solid ${tokens.colors.neutral[100]};
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.h3`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[800]};
  margin: 0;
  line-height: ${tokens.lineHeight.snug};
`;

const QuantityBadge = styled.span`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.neutral[500]};
`;

const Price = styled.p`
  font-size: ${tokens.fontSize.base};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.success[600]};
  margin: 0;
  flex-shrink: 0;
`;

type Props = {
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
};

const ProductDetailsInConfirmation = ({ quantity, name, price, imgUrl }: Props) => {
  return (
    <Row>
      <Thumbnail src={imgUrl} alt={name} />
      <Info>
        <Name>{name}</Name>
        <QuantityBadge>Qtd: {quantity}</QuantityBadge>
      </Info>
      <Price>R$ {(price * quantity).toFixed(2)}</Price>
    </Row>
  );
};

export { ProductDetailsInConfirmation };
