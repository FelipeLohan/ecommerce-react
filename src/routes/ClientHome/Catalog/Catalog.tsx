import { ProductCatalogCard } from "../../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { CategoryFilter } from "../../../components/CategoryFilter";
import * as productService from "../../../services/product-service.ts";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";
import { ArrowUpDown, Check, SearchX } from "lucide-react";
import { HeroBanner } from "../../../components/HeroBanner";
import { cn } from "../../../lib/cn.ts";

const SORT_OPTIONS = [
  { label: "Nome A-Z",    value: "name,asc"   },
  { label: "Nome Z-A",    value: "name,desc"  },
  { label: "Menor preço", value: "price,asc"  },
  { label: "Maior preço", value: "price,desc" },
] as const;

type SortValue = typeof SORT_OPTIONS[number]["value"];

const SKELETON_COUNT = 8;

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sort, setSort] = useState<SortValue>("name,asc");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setPage(0);
    setProducts([]);
  }, [name, categoryId, sort]);

  useEffect(() => {
    if (page === 0) setIsLoading(true);

    productService
      .findPageRequest(page, name, categoryId, sort)
      .then((response) => {
        setIsLast(response.data.last);
        setTotalElements(response.data.totalElements);
        const nextPage = response.data.content;
        setProducts((prev) => (page === 0 ? nextPage : prev.concat(nextPage)));
      })
      .finally(() => setIsLoading(false));
  }, [page, name, categoryId, sort]);

  function handleCategoryChange(id: number) {
    setCategoryId(id);
  }

  function handleSortChange(value: SortValue) {
    setSort(value);
    setSortOpen(false);
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  return (
    <>
      <HeroBanner />

      <div className="mt-8">
        <CategoryFilter selectedId={categoryId} onChange={handleCategoryChange} />
      </div>

      {!isLoading && products.length > 0 && (
        <div className="w-[90%] mx-auto mt-4 flex justify-between items-center gap-4 max-sm:flex-col max-sm:items-start">
          <span className="text-sm text-neutral-500">{totalElements} produto(s) encontrado(s)</span>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen((prev) => !prev)}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 bg-white border-[1.5px] border-neutral-200 rounded-md px-3 py-1.5 cursor-pointer transition-[border-color,background] duration-150 hover:border-primary-400 hover:bg-primary-50"
            >
              <ArrowUpDown size={14} />
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
            </button>

            {sortOpen && (
              <ul className="absolute right-0 top-[calc(100%+6px)] bg-white border border-neutral-200 rounded-md shadow-md list-none m-0 py-1 min-w-[160px] z-50">
                {SORT_OPTIONS.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => handleSortChange(opt.value)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-neutral-50",
                      sort === opt.value
                        ? "font-semibold text-primary-600"
                        : "font-normal text-neutral-700"
                    )}
                  >
                    {sort === opt.value && <Check size={13} />}
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="w-[90%] mx-auto mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 sm:gap-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden h-[340px]"
              style={{ animation: "shimmer 1.4s ease-in-out infinite", background: "linear-gradient(90deg, var(--color-neutral-100) 25%, var(--color-neutral-200) 50%, var(--color-neutral-100) 75%)", backgroundSize: "200% 100%" }}
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-neutral-400 text-center">
          <SearchX size={48} strokeWidth={1.5} />
          <p className="text-lg font-semibold text-neutral-600 m-0">Nenhum produto encontrado</p>
          <p className="text-sm text-neutral-400 m-0">
            Tente outros termos ou remova os filtros aplicados.
          </p>
        </div>
      ) : (
        <div className="w-[90%] mx-auto mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 sm:gap-3">
          {products.map((product) => (
            <Link key={product.id} to={`/product-details/${product.id}`} className="no-underline block">
              <ProductCatalogCard product={product} />
            </Link>
          ))}
        </div>
      )}

      {!isLoading && !isLast && (
        <div className="mt-6 mb-10" onClick={handleNextPage}>
          <CtaLoadMore />
        </div>
      )}
    </>
  );
};

export { Catalog };
