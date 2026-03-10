import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
};

export type ContextToastType = {
  addToast: (type: ToastType, message: string) => void;
};

export const ContextToast = createContext<ContextToastType>({
  addToast: () => {},
});
