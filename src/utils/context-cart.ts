import { createContext } from "react";

export type ContextCartQuantityType = {
  contextCartQuantity: number;
  setContextCartQuantity: (contextCartQuantity: number) => void;
}

export const ContextCartQuantity = createContext<ContextCartQuantityType>({
  contextCartQuantity: 0,
  setContextCartQuantity: () => {}
})