export type OrderStatus =
  | "WAITING_PAYMENT"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export type OrderHistoryItemDTO = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
  subTotal: number;
};

export type OrderHistoryDTO = {
  id: string;
  orderId: number;
  moment: string;
  status: OrderStatus;
  paymentMoment: string | null;
  clientName: string;
  clientEmail: string;
  items: OrderHistoryItemDTO[];
  total: number;
};

export type SpringPage<T> = {
  content: T[];
  pageable: { pageNumber: number; pageSize: number };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
};
