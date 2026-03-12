import { ProductDetailsInCart } from "../../../components/ProductDetailInCart";
import { CtaButton } from "../../../components/CtaButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as cartService from "../../../services/cart-service.ts";
import * as orderService from "../../../services/order-service.ts";
import { OrderDTO } from "../../../models/order";
import { ContextCartQuantity } from "../../../utils/context-cart";

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
    <div className="max-w-[1100px] mx-auto mt-10 px-6 md:mt-6">
      <h1 className="text-2xl font-bold text-neutral-900 m-0 mb-6">Carrinho</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
          <div className="text-neutral-300">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <p className="text-lg font-semibold text-neutral-700 m-0">Seu carrinho está vazio</p>
          <p className="text-sm text-neutral-400 m-0">Adicione produtos para continuar comprando.</p>
          <div className="mt-2">
            <CtaButton variant="primary" onClick={handleWhileBuying}>
              Explorar produtos
            </CtaButton>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 items-start md:[grid-template-columns:65fr_35fr]">
          {/* Items list */}
          <div className="flex flex-col gap-4">
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
          </div>

          {/* Summary panel */}
          <aside className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 md:sticky md:top-20">
            <h2 className="text-lg font-semibold text-neutral-900 m-0 mb-5">Resumo do pedido</h2>

            {cart.items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm text-neutral-600 py-2 border-b border-neutral-100">
                <span>{item.name} × {item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between items-center text-xl font-bold text-neutral-900 pt-4 mt-2">
              <span>Total</span>
              <span>R$ {cart.total.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <CtaButton variant="primary" fullWidth size="lg" onClick={handlePlaceOrderClick}>
                Finalizar pedido
              </CtaButton>
              <CtaButton variant="secondary" fullWidth onClick={handleWhileBuying}>
                Continuar comprando
              </CtaButton>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 mt-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Compra 100% segura
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export { Cart };
