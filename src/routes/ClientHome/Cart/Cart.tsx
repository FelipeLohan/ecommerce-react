import styled from "styled-components";
import { ProductDetailsInCart } from "../../../components/ProductDetailInCart";
import { CtaButton } from "../../../components/CtaButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as cartService from "../../../services/cart-service.ts";
import * as orderService from "../../../services/order-service.ts";
import { OrderDTO } from "../../../models/order";
import { ContextCartQuantity } from "../../../utils/context-cart";
import { tokens } from "../../../styles/tokens.ts";

/* ── Page wrapper ────────────────────────────────────────── */
const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 24px;

  @media (max-width: ${tokens.breakpoint.md}) {
    margin: 24px auto;
  }
`;

const PageTitle = styled.h1`
  font-size: ${tokens.fontSize["2xl"]};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  margin: 0 0 24px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 65fr 35fr;
  gap: 24px;
  align-items: start;

  @media (max-width: ${tokens.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

/* ── Items list ──────────────────────────────────────────── */
const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ── Summary panel ───────────────────────────────────────── */
const SummaryPanel = styled.aside`
  background: ${tokens.colors.neutral[50]};
  border: 1px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.lg};
  padding: 24px;
  position: sticky;
  top: 80px;
`;

const SummaryTitle = styled.h2`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[900]};
  margin: 0 0 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[600]};
  padding: 8px 0;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${tokens.fontSize.xl};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  padding-top: 16px;
  margin-top: 8px;
`;

const SummaryActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.neutral[400]};
  margin-top: 12px;
`;

/* ── Empty state ─────────────────────────────────────────── */
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 24px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  color: ${tokens.colors.neutral[300]};
`;

const EmptyTitle = styled.p`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[700]};
  margin: 0;
`;

const EmptySubtitle = styled.p`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[400]};
  margin: 0;
`;

/* ── Component ───────────────────────────────────────────── */
const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<OrderDTO>(cartService.getCart());
  const { setContextCartQuantity } = useContext(ContextCartQuantity);

  function handleWhileBuying() {
    navigate("/");
  }

  function handleClearCart() {
    cartService.clearCart();
    setCart(cartService.getCart());
    setContextCartQuantity(cartService.getCart().items.length);
  }

  function handleIncrease(productId: number) {
    cartService.increaseItem(productId);
    setCart(cartService.getCart());
  }

  function handleDecrease(productId: number) {
    cartService.decreaseItem(productId);
    setCart(cartService.getCart());
    setContextCartQuantity(cartService.getCart().items.length);
  }

  function handlePlaceOrderClick() {
    orderService.placeOrderRequest(cart).then((response) => {
      cartService.clearCart();
      setContextCartQuantity(0);
      navigate(`/confirmation/${response.data.id}`);
    });
  }

  const isEmpty = cart.items.length === 0;

  return (
    <PageWrapper>
      <PageTitle>Carrinho</PageTitle>

      {isEmpty ? (
        <EmptyState>
          <EmptyIcon>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </EmptyIcon>
          <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
          <EmptySubtitle>Adicione produtos para continuar comprando.</EmptySubtitle>
          <div style={{ marginTop: "8px" }}>
            <CtaButton variant="primary" onClick={handleWhileBuying}>
              Explorar produtos
            </CtaButton>
          </div>
        </EmptyState>
      ) : (
        <ContentGrid>
          {/* Items list */}
          <ItemsList>
            {cart.items.map((item) => (
              <ProductDetailsInCart
                key={item.productId}
                quantity={item.quantity}
                name={item.name}
                price={item.price}
                imgUrl={item.imgUrl}
                handleIncreaseClick={() => handleIncrease(item.productId)}
                handleDecreaseClick={() => handleDecrease(item.productId)}
              />
            ))}
            <CtaButton variant="ghost" fullWidth onClick={handleClearCart}>
              Limpar carrinho
            </CtaButton>
          </ItemsList>

          {/* Summary panel */}
          <SummaryPanel>
            <SummaryTitle>Resumo do pedido</SummaryTitle>

            {cart.items.map((item) => (
              <SummaryRow key={item.productId}>
                <span>{item.name} × {item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </SummaryRow>
            ))}

            <SummaryTotal>
              <span>Total</span>
              <span>R$ {cart.total.toFixed(2)}</span>
            </SummaryTotal>

            <SummaryActions>
              <CtaButton variant="primary" fullWidth size="lg" onClick={handlePlaceOrderClick}>
                Finalizar pedido
              </CtaButton>
              <CtaButton variant="secondary" fullWidth onClick={handleWhileBuying}>
                Continuar comprando
              </CtaButton>
            </SummaryActions>

            <SecureBadge>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Compra 100% segura
            </SecureBadge>
          </SummaryPanel>
        </ContentGrid>
      )}
    </PageWrapper>
  );
};

export { Cart };
