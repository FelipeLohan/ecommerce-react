import { useEffect, useState } from "react";
import { SearchInput } from "../../../components/SearchInput";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { OrderHistoryCard } from "../../../components/OrderHistoryCard";
import { OrderStatusBadge } from "../../../components/OrderStatusBadge";
import { OrderHistoryDTO, SpringPage } from "../../../models/order-history";
import * as orderHistoryService from "../../../services/order-history-service";

type QueryParams = {
  page: number;
  email: string;
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderHistoryDTO[]>([]);
  const [isLast, setIsLast] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    email: "",
  });

  useEffect(() => {
    orderHistoryService
      .findPageRequest({ page: queryParams.page, email: queryParams.email || undefined })
      .then((response) => {
        const data = response.data as SpringPage<OrderHistoryDTO>;
        setIsLast(data.last);
        const nextPage = data.content;
        setOrders((prev) =>
          queryParams.page === 0 ? nextPage : prev.concat(nextPage)
        );
      });
  }, [queryParams]);

  function handleSearch(email: string) {
    setOrders([]);
    setQueryParams({ page: 0, email });
  }

  function handleNextPage() {
    setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  function handleToggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="max-w-[1100px] mx-auto px-6 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 m-0">
          Histórico de pedidos
        </h1>
      </div>

      <div className="mb-5">
        <SearchInput onSearch={handleSearch} />
      </div>

      {/* Desktop table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["#Pedido", "Cliente", "E-mail", "Data", "Status", "Total", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-[0.05em] px-4 py-3 text-left border-b border-neutral-100"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr
                  key={order.id}
                  className="[&_td]:border-b [&_td]:border-neutral-100 hover:bg-neutral-50 cursor-pointer"
                  onClick={() => handleToggleExpand(order.id)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-neutral-700">
                    #{order.orderId}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {order.clientName}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-500">
                    {order.clientEmail}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-500 whitespace-nowrap">
                    {formatDate(order.moment)}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary-600 whitespace-nowrap">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-3 text-neutral-400 text-xs">
                    {expandedId === order.id ? "▲" : "▼"}
                  </td>
                </tr>

                {expandedId === order.id && (
                  <tr key={`${order.id}-items`}>
                    <td
                      colSpan={7}
                      className="bg-neutral-50 px-6 py-4 border-b border-neutral-100"
                    >
                      <div className="flex flex-col gap-2">
                        {order.items.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center gap-3"
                          >
                            <img
                              src={item.imgUrl}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-md flex-shrink-0 bg-neutral-200"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-800 m-0">
                                {item.name}
                              </p>
                              <p className="text-xs text-neutral-400 m-0">
                                {item.quantity}x{" "}
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-neutral-700 m-0 flex-shrink-0">
                              {formatCurrency(item.subTotal)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-sm text-neutral-400 py-10 m-0">
            Nenhum pedido encontrado.
          </p>
        )}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {orders.map((order) => (
          <OrderHistoryCard key={order.id} order={order} />
        ))}

        {orders.length === 0 && (
          <p className="text-center text-sm text-neutral-400 py-10 m-0">
            Nenhum pedido encontrado.
          </p>
        )}
      </div>

      {!isLast && orders.length > 0 && (
        <div className="mt-5" onClick={handleNextPage}>
          <CtaLoadMore />
        </div>
      )}
    </div>
  );
};

export { OrderHistory };
