import CartIconSvg from "../../assets/CartIcon.svg";
import styled, { css, keyframes } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextCartQuantity } from "../../utils/context-cart.ts";
import { tokens } from "../../styles/tokens.ts";

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  30%       { transform: scale(1.3); }
  60%       { transform: scale(0.9); }
`;

const CartIconWrapper = styled.div<{ $bouncing: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $bouncing }) =>
    $bouncing &&
    css`
      animation: ${bounce} 400ms ease;
    `}
`;

const CartIconImage = styled.img`
  width: 24px;
  height: 24px;

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: ${tokens.colors.danger[500]};
  color: #ffffff;
  font-size: 10px;
  font-weight: ${tokens.fontWeight.semibold};
  border-radius: ${tokens.radius.full};
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const CartIcon = () => {
  const { contextCartQuantity } = useContext(ContextCartQuantity);
  const [bouncing, setBouncing] = useState(false);
  const prevQtyRef = useRef(contextCartQuantity);

  useEffect(() => {
    if (contextCartQuantity > prevQtyRef.current) {
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 400);
      prevQtyRef.current = contextCartQuantity;
      return () => clearTimeout(timer);
    }
    prevQtyRef.current = contextCartQuantity;
  }, [contextCartQuantity]);

  return (
    <CartIconWrapper $bouncing={bouncing}>
      <CartIconImage src={CartIconSvg} alt="Carrinho" />
      {contextCartQuantity > 0 && <Badge>{contextCartQuantity}</Badge>}
    </CartIconWrapper>
  );
};

export { CartIcon };
