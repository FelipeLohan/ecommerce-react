import styled from "styled-components";
import { CtaButton } from "../CtaButton";
import { useEffect, useState } from "react";
import { OrderDTO } from "../../models/order";
import { useParams } from "react-router-dom";
import * as orderService from "../../services/order-service.ts";
import { ProductDetailsInConfirmation } from "../ProductDetailsInConfirmation/ProductDetailsInConfirmation.tsx";
import { Link } from "react-router-dom";

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

const ConfirmationAdvisorContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
`;

const CtaButtonContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Confirmation = () => {
  const params = useParams();

  const [order, setOrder] = useState<OrderDTO>();

  useEffect(() => {
    orderService
      .findByIdRequest(Number(params.orderId))
      .then((response) => setOrder(response.data));
  }, []);

  return (
    <>
      <ProductDetailsInCartContainer>
        {
          <>
            {order?.items.map((e) => (
              <ProductDetailsInConfirmation
                key={e.productId}
                quantity={e.quantity}
                name={e.name}
                price={e.price}
                imgUrl={e.imgUrl}
              />
            ))}
            <ProductsTotalPrice>
              <p>
                Total: <span>R$ {order?.total.toFixed(2)}</span>
              </p>
            </ProductsTotalPrice>
          </>
        }
      </ProductDetailsInCartContainer>
      <ConfirmationAdvisorContainer>
        <h2>Pedido número {order?.id} confirmado!</h2>
      </ConfirmationAdvisorContainer>

      <CtaButtonContainer>
        <Link to="/">
        <CtaButton
          text="Inicio"
          primaryColor="#3483FA"
          secondaryColor="#fff"
          handleClick={null}
        />
        </Link>
      </CtaButtonContainer>
    </>
  );
};

export { Confirmation };
