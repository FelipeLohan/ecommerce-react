import { CtaButton } from "../CtaButton";
import { useEffect, useState } from "react";
import { OrderDTO } from "../../models/order";
import { useParams } from "react-router-dom";
import * as orderService from "../../services/order-service.ts";
import { ProductDetailsInConfirmation } from "../ProductDetailsInConfirmation/ProductDetailsInConfirmation.tsx";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const params = useParams();
  const [order, setOrder] = useState<OrderDTO>();

  useEffect(() => {
    orderService
      .findByIdRequest(Number(params.orderId))
      .then((response) => setOrder(response.data));
  }, []);

  return (
    <div className="min-h-screen bg-surface-page px-4 py-12 pb-16 flex flex-col items-center gap-8">

      {/* Hero de sucesso */}
      <div
        className="flex flex-col items-center gap-4"
        style={{ animation: "fade-up 0.5s ease both" }}
      >
        {/* Ícone de check */}
        <div
          className="w-[72px] h-[72px] rounded-full bg-success-500 flex items-center justify-center"
          style={{ animation: "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-neutral-800 m-0 text-center">
          Pedido confirmado!
        </h1>
        <p className="text-base text-neutral-500 m-0 text-center">
          Obrigado pela sua compra. Seu pedido foi recebido com sucesso.
        </p>
        {order && (
          <span className="inline-block px-3.5 py-1 bg-primary-50 text-primary-700 border border-primary-200 rounded-full text-sm font-semibold">
            Pedido #{order.id}
          </span>
        )}
      </div>

      {/* Card do pedido */}
      <div
        className="w-full max-w-[680px] bg-white rounded-xl shadow-lg overflow-hidden"
        style={{ animation: "fade-up 0.5s 0.1s ease both" }}
      >
        <div className="px-7 py-5 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-700 m-0">Resumo do pedido</h2>
        </div>

        <div className="flex flex-col">
          {order?.items.map((e) => (
            <ProductDetailsInConfirmation
              key={e.productId}
              quantity={e.quantity}
              name={e.name}
              price={e.price}
              imgUrl={e.imgUrl}
            />
          ))}
        </div>

        <div className="flex justify-between items-center px-7 py-5 border-t border-neutral-100 bg-neutral-50">
          <span className="text-base font-medium text-neutral-600">Total</span>
          <span className="text-xl font-bold text-success-600">
            R$ {order?.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Ações */}
      <div
        className="flex gap-3 sm:flex-col sm:w-full sm:max-w-[680px]"
        style={{ animation: "fade-up 0.5s 0.2s ease both" }}
      >
        <Link to="/catalog">
          <CtaButton variant="secondary">Ver mais produtos</CtaButton>
        </Link>
        <Link to="/">
          <CtaButton variant="primary">Ir para o início</CtaButton>
        </Link>
      </div>
    </div>
  );
};

export { Confirmation };
