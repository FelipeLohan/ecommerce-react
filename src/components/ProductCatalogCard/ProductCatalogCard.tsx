import { ProductDTO } from "../../models/product";
import { CategoryCard } from "../CategoryCard/CategoryCard.tsx";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: ProductDTO;
};

const ProductCatalogCard = ({ product }: Props) => {
  return (
    <div className="group bg-white border border-neutral-200 rounded-md shadow-sm overflow-hidden cursor-pointer flex flex-col w-full transition-[box-shadow,transform] duration-[250ms] hover:shadow-md hover:-translate-y-[3px]">

      {/* Imagem */}
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-60 object-cover max-sm:object-contain max-sm:p-2 block transition-transform duration-[400ms] group-hover:scale-[1.03]"
      />

      {/* Corpo */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-1.5 flex-1">
        <h4 className="text-sm font-medium text-neutral-700 leading-snug m-0 line-clamp-2">
          {product.name}
        </h4>

        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.categories.map((cat) => (
              <CategoryCard key={cat.id} name={cat.name} />
            ))}
          </div>
        )}

        <p className="text-lg font-bold text-neutral-900 my-1">
          R$ {product.price.toFixed(2)}
        </p>

        {/* Botão Comprar — ícone aparece no hover do card via group */}
        <div className="flex items-center justify-center gap-2 py-2 bg-primary-600 text-white text-sm font-medium rounded-md transition-colors duration-[250ms] hover:bg-primary-700">
          <ShoppingCart
            size={15}
            className="opacity-0 w-0 transition-[opacity,width] duration-[150ms] group-hover:opacity-100 group-hover:w-[15px]"
          />
          Comprar
        </div>
      </div>
    </div>
  );
};

export { ProductCatalogCard };
