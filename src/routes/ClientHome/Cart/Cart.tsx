import styled from "styled-components";
import { ProductDetailsInCart } from "../../../components/ProductDetailInCart";
import { CtaButton } from "../../../components/CtaButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as cartService from "../../../services/cart-service.ts";
import * as orderService from "../../../services/order-service.ts";
import { OrderDTO } from "../../../models/order";
import { ContextCartQuantity } from "../../../utils/context-cart";

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

   @media (max-width: 600px){
  h3, p{
    font-size: 3.2vmin;
  }
  }

  @media (max-width: 420px){
  h3, p{
    font-size: 4vmin;
  }
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
    navigate("/");
  }

  function handleClearCart(){
    cartService.clearCart()
    setCart(cartService.getCart())
    setContextCartQuantity(cartService.getCart().items.length);
  }

    function handleIncrease(productId: number){
      cartService.increaseItem(productId)
      setCart(cartService.getCart())
    }

    function handleDecrease(productId: number){
      cartService.decreaseItem(productId)
      setCart(cartService.getCart())
      setContextCartQuantity(cartService.getCart().items.length);
    }

    function handlePlaceOrderClick(){
      orderService.placeOrderRequest(cart)
        .then(response => {
          cartService.clearCart()
          setContextCartQuantity(0)
          navigate(`/confirmation/${response.data.id}`)
        })
    }

  const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

  const { setContextCartQuantity } = useContext(ContextCartQuantity);


  return (
    <>
      <ProductDetailsInCartContainer>
        {cart.items.length === 0 ? (
          <div>
            <h2>Carrinho Vazio!</h2>
          </div>
        ) : (
          <>
            {cart.items.map((e) => (
              <ProductDetailsInCart
                key={e.productId}
                quantity={e.quantity}
                name={e.name}
                price={e.price}
                imgUrl={e.imgUrl}
                handleIncreaseClick={() => handleIncrease(e.productId)}
                handleDecreaseClick={() => handleDecrease(e.productId)}
              />
            ))}
            <ProductsTotalPrice>
              <p>
                Total: <span>R$ {cart.total.toFixed(2)}</span>
              </p>
            </ProductsTotalPrice>
          </>
        )}
      </ProductDetailsInCartContainer>
      <CtaButtonContainer>
        <CtaButton
          text="Finalizar pedido"
          primaryColor="#3483FA"
          secondaryColor="#fff"
          handleClick={handlePlaceOrderClick}
        />
        <CtaButton
          text="Continuar comprando"
          primaryColor="#fff"
          secondaryColor="#3483FA"
          handleClick={handleWhileBuying}
        />
        <CtaButton
        text="Limpar carrinho"
        primaryColor="#fff"
        secondaryColor="#3483FA"
        handleClick={handleClearCart}
        />
      </CtaButtonContainer>
    </>
  );
};

export { Cart };
