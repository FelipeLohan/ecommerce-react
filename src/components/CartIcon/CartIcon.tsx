import CartIconSvg from "../../assets/CartIcon.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextCartQuantity } from "../../utils/context-cart.ts";

const CartIcon = () => {
  const { contextCartQuantity } = useContext(ContextCartQuantity);
  const [bouncing, setBouncing] = useState(false);
  const prevQtyRef = useRef(contextCartQuantity);

  useEffect(() => {
    if (contextCartQuantity > prevQtyRef.current) {
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 400);
      prevQtyRef.current = contextCartQuantity;
      return () => clearTimeout(timer);
    }
    prevQtyRef.current = contextCartQuantity;
  }, [contextCartQuantity]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={bouncing ? { animation: "cart-bounce 400ms ease" } : undefined}
    >
      <img
        src={CartIconSvg}
        alt="Carrinho"
        className="w-6 h-6 sm:w-5 sm:h-5"
      />
      {contextCartQuantity > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-danger-500 text-white text-[10px] font-semibold rounded-full border-2 border-white flex items-center justify-center leading-none">
          {contextCartQuantity}
        </span>
      )}
    </div>
  );
};

export { CartIcon };
