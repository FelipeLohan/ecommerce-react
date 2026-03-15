import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OrderHistoryDTO } from "../../models/order-history";
import { OrderStatusBadge } from "../OrderStatusBadge";

type Props = {
  order: OrderHistoryDTO;
};

const OrderHistoryCard = ({ order }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(order.moment).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTotal = order.total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="bg-white rounded-lg border border-neutral-100 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-800 m-0">
              #{order.orderId} — {order.clientName}
            </p>
            <p className="text-xs text-neutral-400 m-0 mt-0.5 truncate">
              {order.clientEmail}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-400 m-0">{formattedDate}</p>
            <p className="text-sm font-bold text-primary-600 m-0 mt-0.5">
              {formattedTotal}
            </p>
          </div>

          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Ocultar itens" : "Ver itens"}
            className="flex items-center gap-1 text-xs text-neutral-500 bg-transparent border-none cursor-pointer px-2 py-1 rounded-md transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-700"
          >
            {expanded ? (
              <>
                Ocultar <ChevronUp size={14} />
              </>
            ) : (
              <>
                Ver itens <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-neutral-100 px-4 py-3 flex flex-col gap-2">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-3"
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-md flex-shrink-0 bg-neutral-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-800 m-0 line-clamp-1">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-400 m-0">
                  {item.quantity}x{" "}
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <p className="text-xs font-semibold text-neutral-700 m-0 flex-shrink-0">
                {item.subTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { OrderHistoryCard };
