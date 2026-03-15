import { cn } from "../../lib/cn";
import { OrderStatus } from "../../models/order-history";

type Props = {
  status: OrderStatus;
};

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  WAITING_PAYMENT: {
    label: "Aguardando pagamento",
    className: "bg-yellow-100 text-yellow-700",
  },
  PAID: {
    label: "Pago",
    className: "bg-green-100 text-green-700",
  },
  SHIPPED: {
    label: "Enviado",
    className: "bg-blue-100 text-blue-700",
  },
  DELIVERED: {
    label: "Entregue",
    className: "bg-emerald-100 text-emerald-700",
  },
  CANCELED: {
    label: "Cancelado",
    className: "bg-red-100 text-red-700",
  },
};

const OrderStatusBadge = ({ status }: Props) => {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-neutral-100 text-neutral-600",
  };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
        config.className
      )}
    >
      {config.label}
    </span>
  );
};

export { OrderStatusBadge };
