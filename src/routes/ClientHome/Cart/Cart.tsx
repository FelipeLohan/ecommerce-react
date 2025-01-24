import styled from "styled-components";
import { ProductDetailsInCart } from "../../../components/ProductDetailInCart";
import { CtaButton } from "../../../components/CtaButton";
import { Button } from "../../../models/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as cartService from "../../../services/cart-service"
import { OrderDTO, OrderItemDTO } from "../../../models/order";

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

const button: Button[] = [
  {
    primaryColor: "#3483fa",
    secondaryColor: "#fff",
    text: "Finalizar pedido",
  },
  {
    primaryColor: "#fff",
    secondaryColor: "#3483fa",
    text: "Continuar comprando",
  },
];

const item1 : OrderItemDTO = new OrderItemDTO(
  4, 1, "PC Gamer", 1200, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg"
)

const item2 : OrderItemDTO = new OrderItemDTO(
  5, 2, "Rails for Dummies", 100.99, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg"
)

const cartItem = 
{
  items: [
    {
      productId: 4,
      quantity: 1,
      name: "PC Gamer",
      price: 1200,
      imgUrl:
        "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg",
    },
    {
      productId: 5,
      quantity: 2,
      name: "Rails for Dummies",
      price: 100.99,
      imgUrl:
        "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg",
    },
  ],
};

const Cart = () => {

  const cart : OrderDTO = new OrderDTO();
  
  useEffect(() => {
    cart.items.push(item1)
    cart.items.push(item2)
    cartService.saveCart(cart)
  }, [])

  return (
    <>
      <ProductDetailsInCartContainer>
      {
        cartItem.items.map(e => <ProductDetailsInCart key={e.productId} quantity={e.quantity} name={e.name} price={e.price} imgUrl={e.imgUrl} />)
      }
        <ProductsTotalPrice>
          <p>
            Total: <span>R$10000,00</span>
          </p>
        </ProductsTotalPrice>
      </ProductDetailsInCartContainer>
      <CtaButtonContainer>
        {button.map((e) =>
          e.text === "Finalizar pedido" ? (
            <Link to="/" key={e.text}>
              <CtaButton button={e} />
            </Link>
          ) : (
            <CtaButton key={e.text} button={e} />
          )
        )}
      </CtaButtonContainer>
    </>
  );
};

export { Cart };
