import * as cartService from '../../services/cart-service.ts'
import CartIconSvg from "../../assets/CartIcon.svg";
import styled from "styled-components";
import { useState } from "react";

const CartQuantity = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ff0000;
  border-radius: 50%;
  position: relative;
  bottom: 10px;
  left: 14px;
  padding: 3px;
  font-size: 12px;
  color: #fff;
`;

const CartIconImage = styled.img`
  position: absolute;
`;

const CartIcon = () => {
  const [cart, setCart] = useState(cartService.getCart());

  return (
    <>
      <div>
        <CartIconImage src={CartIconSvg} />
        <CartQuantity>{cart.items.length}</CartQuantity>
      </div>
    </>
  );
};

export { CartIcon };
