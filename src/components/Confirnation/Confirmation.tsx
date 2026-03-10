import styled, { keyframes } from "styled-components";
import { CtaButton } from "../CtaButton";
import { useEffect, useState } from "react";
import { OrderDTO } from "../../models/order";
import { useParams } from "react-router-dom";
import * as orderService from "../../services/order-service.ts";
import { ProductDetailsInConfirmation } from "../ProductDetailsInConfirmation/ProductDetailsInConfirmation.tsx";
import { Link } from "react-router-dom";
import { tokens } from "../../styles/tokens.ts";

/* ── Animations ──────────────────────────────────────────── */
const popIn = keyframes`
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
`;

const fadeUp = keyframes`
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

/* ── Layout ──────────────────────────────────────────────── */
const Page = styled.div`
  min-height: 100vh;
  background: ${tokens.colors.surface.page};
  padding: 48px 16px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

/* ── Success hero ────────────────────────────────────────── */
const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: ${fadeUp} 0.5s ease both;
`;

const CheckCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${tokens.colors.success[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${popIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;

  svg {
    width: 36px;
    height: 36px;
    stroke: #ffffff;
    stroke-width: 3;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const HeroTitle = styled.h1`
  font-size: ${tokens.fontSize["2xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[800]};
  margin: 0;
  text-align: center;
`;

const HeroSubtitle = styled.p`
  font-size: ${tokens.fontSize.base};
  color: ${tokens.colors.neutral[500]};
  margin: 0;
  text-align: center;
`;

const OrderBadge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  background: ${tokens.colors.primary[50]};
  color: ${tokens.colors.primary[700]};
  border: 1px solid ${tokens.colors.primary[200]};
  border-radius: ${tokens.radius.full};
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.semibold};
`;

/* ── Order card ──────────────────────────────────────────── */
const OrderCard = styled.div`
  width: 100%;
  max-width: 680px;
  background: #ffffff;
  border-radius: ${tokens.radius.xl};
  box-shadow: ${tokens.shadow.lg};
  overflow: hidden;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

const CardHeader = styled.div`
  padding: 20px 28px;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};

  h2 {
    font-size: ${tokens.fontSize.base};
    font-weight: ${tokens.fontWeight.semibold};
    color: ${tokens.colors.neutral[700]};
    margin: 0;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-top: 1px solid ${tokens.colors.neutral[100]};
  background: ${tokens.colors.neutral[50]};

  span:first-child {
    font-size: ${tokens.fontSize.base};
    font-weight: ${tokens.fontWeight.medium};
    color: ${tokens.colors.neutral[600]};
  }

  span:last-child {
    font-size: ${tokens.fontSize.xl};
    font-weight: ${tokens.fontWeight.bold};
    color: ${tokens.colors.success[600]};
  }
`;

/* ── Actions ─────────────────────────────────────────────── */
const Actions = styled.div`
  display: flex;
  gap: 12px;
  animation: ${fadeUp} 0.5s 0.2s ease both;

  @media (max-width: ${tokens.breakpoint.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 680px;
  }
`;

/* ── Component ───────────────────────────────────────────── */
const Confirmation = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderDTO>();

  useEffect(() => {
    orderService
      .findByIdRequest(Number(params.orderId))
      .then((response) => setOrder(response.data));
  }, []);

  return (
    <Page>
      <Hero>
        <CheckCircle>
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckCircle>
        <HeroTitle>Pedido confirmado!</HeroTitle>
        <HeroSubtitle>
          Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
        </HeroSubtitle>
        {order && <OrderBadge>Pedido #{order.id}</OrderBadge>}
      </Hero>

      <OrderCard>
        <CardHeader>
          <h2>Resumo do pedido</h2>
        </CardHeader>

        <ItemsList>
          {order?.items.map((e) => (
            <ProductDetailsInConfirmation
              key={e.productId}
              quantity={e.quantity}
              name={e.name}
              price={e.price}
              imgUrl={e.imgUrl}
            />
          ))}
        </ItemsList>

        <TotalRow>
          <span>Total</span>
          <span>R$ {order?.total.toFixed(2)}</span>
        </TotalRow>
      </OrderCard>

      <Actions>
        <Link to="/catalog">
          <CtaButton variant="secondary">Ver mais produtos</CtaButton>
        </Link>
        <Link to="/">
          <CtaButton variant="primary">Ir para o início</CtaButton>
        </Link>
      </Actions>
    </Page>
  );
};

export { Confirmation };
