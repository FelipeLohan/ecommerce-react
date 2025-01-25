import styled from "styled-components";
import { ProductDetailsInCart } from "../../../components/ProductDetailInCart";
import { CtaButton } from "../../../components/CtaButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as cartService from "../../../services/cart-service"
import { OrderDTO } from "../../../models/order";

const ProductDetailsInCartContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const ProductsTotalPrice = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #c2c2c2;
  padding: 20px;
  font-size: 2.5vmin;

  span {
    color: #0caf1d;
    align-items: center;
  }
`;

const CtaButtonContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Cart = () => {
  const navigate = useNavigate();

  function handleWhileBuying() {
    navigate("/")
  }

  const [cart, setCart] = useState<OrderDTO>(cartService.getCart())

  return (
    <>
      <ProductDetailsInCartContainer>
      {
        cart.items.map(e => <ProductDetailsInCart key={e.productId} quantity={e.quantity} name={e.name} price={e.price} imgUrl={e.imgUrl} />)
      }
        <ProductsTotalPrice>
          <p>
            Total: <span>R$10000,00</span>
          </p>
        </ProductsTotalPrice>
      </ProductDetailsInCartContainer>
      <CtaButtonContainer>
        <CtaButton text="Finalizar pedido" primaryColor="#3483FA" secondaryColor="#fff" handleClick={null} />
      <CtaButton text="Continuar comprando" primaryColor="#fff" secondaryColor="#3483FA" handleClick={handleWhileBuying} />
      </CtaButtonContainer>
    </>
  );
};

export { Cart };
