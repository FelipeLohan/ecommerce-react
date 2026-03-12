type Props = {
  quantity: number;
  name: string;
  price: number;
  imgUrl: string;
};

const ProductDetailsInConfirmation = ({ quantity, name, price, imgUrl }: Props) => {
  return (
    <div className="flex items-center gap-4 px-7 py-4 border-b border-neutral-100 last:border-none">
      <img
        src={imgUrl}
        alt={name}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0 border border-neutral-100"
      />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-neutral-800 m-0 leading-snug">{name}</h3>
        <span className="text-xs text-neutral-500">Qtd: {quantity}</span>
      </div>
      <p className="text-base font-bold text-success-600 m-0 flex-shrink-0">
        R$ {(price * quantity).toFixed(2)}
      </p>
    </div>
  );
};

export { ProductDetailsInConfirmation };
