type Props = {
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
  handleIncreaseClick: () => void;
  handleDecreaseClick: () => void;
};

const ProductDetailsInCart = ({
  quantity,
  name,
  price,
  imgUrl,
  handleIncreaseClick,
  handleDecreaseClick,
}: Props) => {
  return (
    <div className="flex items-center gap-3 max-sm:gap-2.5 p-4 max-sm:p-3 bg-white border border-neutral-100 rounded-lg shadow-sm">

      <img src={imgUrl} alt={name} className="w-20 h-20 max-sm:w-14 max-sm:h-14 object-cover rounded-md flex-shrink-0" />

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-800 m-0 line-clamp-2 leading-snug">
          {name}
        </p>
        <p className="text-xs text-neutral-500 m-0">R$ {price.toFixed(2)} cada</p>

        <p className="text-base font-bold text-neutral-900 m-0 mt-1">
          R$ {(price * quantity).toFixed(2)}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecreaseClick}
            aria-label="Diminuir"
            className="w-7 h-7 flex items-center justify-center border-[1.5px] border-neutral-200 rounded-md bg-white text-base font-medium text-neutral-600 cursor-pointer leading-none transition-[border-color,background,color] duration-[150ms] hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
          >
            −
          </button>
          <span className="text-sm font-semibold text-neutral-800 min-w-[28px] text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncreaseClick}
            aria-label="Aumentar"
            className="w-7 h-7 flex items-center justify-center border-[1.5px] border-neutral-200 rounded-md bg-white text-base font-medium text-neutral-600 cursor-pointer leading-none transition-[border-color,background,color] duration-[150ms] hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleDecreaseClick}
        aria-label="Remover item"
        title="Remover"
        className="bg-transparent border-none text-neutral-400 cursor-pointer p-1 flex items-center flex-shrink-0 transition-colors duration-[150ms] hover:text-danger-500"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  );
};

export { ProductDetailsInCart };
