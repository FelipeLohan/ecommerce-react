import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { CategoryCard } from "../CategoryCard";
import { CtaButton } from "../CtaButton";
import { ProductDTO } from "../../models/product";

type Props = {
  product: ProductDTO;
  onBuy: (quantity: number) => void;
  onBack: () => void;
};

const ProductDetailsCard = ({ product, onBuy, onBack }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="max-w-[1100px] mx-auto my-10 md:my-6 max-sm:my-4 px-6 max-sm:px-4 grid grid-cols-2 gap-12 md:gap-6 max-sm:gap-4 items-start md:grid-cols-1">
      {/* Left — image */}
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full aspect-square max-h-[420px] max-sm:aspect-[4/3] max-sm:max-h-[260px] object-contain rounded-lg shadow-md block bg-white"
      />

      {/* Right — info */}
      <div className="flex flex-col gap-4 max-sm:gap-3">
        <nav className="text-sm text-neutral-400 max-sm:text-xs">
          <Link to="/" className="text-neutral-400 no-underline hover:text-primary-600">Início</Link>
          <span className="mx-1.5">›</span>
          <Link to="/" className="text-neutral-400 no-underline hover:text-primary-600">Catálogo</Link>
          <span className="mx-1.5">›</span>
          {product.name}
        </nav>

        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.categories.map((cat) => (
              <CategoryCard key={cat.id} name={cat.name} />
            ))}
          </div>
        )}

        <h1 className="text-3xl max-sm:text-xl font-bold text-neutral-900 leading-snug m-0">{product.name}</h1>
        <p className="text-4xl max-sm:text-2xl font-bold text-primary-600 m-0">R$ {product.price.toFixed(2)}</p>

        <hr className="border-none border-t border-neutral-100 my-1" />

        <p className="text-base max-sm:text-sm text-neutral-600 leading-relaxed m-0">{product.description}</p>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral-700">Quantidade:</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Diminuir quantidade"
            className="w-9 h-9 flex items-center justify-center border-[1.5px] border-neutral-200 rounded-md bg-white text-lg font-medium text-neutral-700 cursor-pointer transition-[border-color,background,color] duration-150 leading-none hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="text-lg font-semibold text-neutral-800 min-w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar quantidade"
            className="w-9 h-9 flex items-center justify-center border-[1.5px] border-neutral-200 rounded-md bg-white text-lg font-medium text-neutral-700 cursor-pointer transition-[border-color,background,color] duration-150 leading-none hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <CtaButton variant="primary" fullWidth size="lg" onClick={() => onBuy(quantity)}>
            <ShoppingCart size={16} style={{ marginRight: 8 }} /> Adicionar ao carrinho
          </CtaButton>
          <CtaButton variant="secondary" fullWidth onClick={onBack}>
            <ArrowLeft size={16} style={{ marginRight: 8 }} /> Voltar ao catálogo
          </CtaButton>
        </div>
      </div>
    </section>
  );
};

export { ProductDetailsCard };
