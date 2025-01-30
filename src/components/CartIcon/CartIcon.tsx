import CartIconSvg from "../../assets/CartIcon.svg";
import styled from "styled-components";
import { useContext } from "react";
import { ContextCartQuantity } from "../../utils/context-cart.ts";

const CartQuantity = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ff0000;
  position: relative;
  border-radius: 50%;
  bottom: 10px;
  left: 14px;
  padding: 2px 4px;
  font-size: 12px;
  color: #fff;
`;

const CartIconImage = styled.img`
  position: absolute;
`;

const CartIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CartIcon = () => {
  const { contextCartQuantity } = useContext(ContextCartQuantity);

  return (
    <>
      <CartIconContainer>
        <CartIconImage src={CartIconSvg} />
        {contextCartQuantity !== 0 && (
          <CartQuantity>{contextCartQuantity}</CartQuantity>
        )}
      </CartIconContainer>
    </>
  );
};

export { CartIcon };
