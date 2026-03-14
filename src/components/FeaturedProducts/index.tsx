import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { ProductCatalogCard } from "../ProductCatalogCard";
import * as productService from "../../services/product-service";
import { ProductDTO } from "../../models/product";

const SKELETON_COUNT = 4;

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productService
      .findFeaturedRequest()
      .then((response) => setProducts(response.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="w-[90%] mx-auto mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Star size={17} className="text-yellow-500 fill-yellow-400" />
        <h2 className="text-base font-bold text-neutral-800 m-0">Em destaque</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 sm:gap-3">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden h-[340px]"
                style={{
                  animation: "shimmer 1.4s ease-in-out infinite",
                  background: "linear-gradient(90deg, var(--color-neutral-100) 25%, var(--color-neutral-200) 50%, var(--color-neutral-100) 75%)",
                  backgroundSize: "200% 100%",
                }}
              />
            ))
          : products.map((product) => (
              <Link key={product.id} to={`/product-details/${product.id}`} className="no-underline block">
                <ProductCatalogCard product={product} />
              </Link>
            ))}
      </div>
    </section>
  );
};

export { FeaturedProducts };
