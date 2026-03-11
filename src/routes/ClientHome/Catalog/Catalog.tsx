import styled, { keyframes } from "styled-components";
import { ProductCatalogCard } from "../../../components/ProductCatalogCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { CategoryFilter } from "../../../components/CategoryFilter";
import * as productService from "../../../services/product-service.ts";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProductDTO } from "../../../models/product.ts";
import { tokens } from "../../../styles/tokens.ts";
import { ArrowUpDown, Check, SearchX } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Nome A-Z",    value: "name,asc"   },
  { label: "Nome Z-A",    value: "name,desc"  },
  { label: "Menor preço", value: "price,asc"  },
  { label: "Maior preço", value: "price,desc" },
] as const;

type SortValue = typeof SORT_OPTIONS[number]["value"];

const ProductsCardsGridContainer = styled.div`
  width: 90%;
  margin: ${tokens.spacing[4]} auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${tokens.breakpoint.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${tokens.breakpoint.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${tokens.breakpoint.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const CategoryFilterContainerMargin = styled.div`
  margin-top: ${tokens.spacing[8]};
`;

const ToolbarRow = styled.div`
  width: 90%;
  margin: ${tokens.spacing[4]} auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${tokens.spacing[4]};

  @media (max-width: ${tokens.breakpoint.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ResultCount = styled.span`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[500]};
`;

const SortWrapper = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[700]};
  background: #ffffff;
  border: 1.5px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.md};
  padding: 6px ${tokens.spacing[3]};
  cursor: pointer;
  transition: border-color ${tokens.transition.fast}, background ${tokens.transition.fast};

  &:hover {
    border-color: ${tokens.colors.primary[400]};
    background: ${tokens.colors.primary[50]};
  }
`;

const SortDropdown = styled.ul<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  background: #ffffff;
  border: 1px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.md};
  box-shadow: ${tokens.shadow.md};
  list-style: none;
  margin: 0;
  padding: ${tokens.spacing[1]} 0;
  min-width: 160px;
  z-index: 50;
`;

const SortOption = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  padding: 8px ${tokens.spacing[4]};
  font-size: ${tokens.fontSize.sm};
  font-weight: ${({ $active }) => $active ? tokens.fontWeight.semibold : tokens.fontWeight.normal};
  color: ${({ $active }) => $active ? tokens.colors.primary[600] : tokens.colors.neutral[700]};
  cursor: pointer;
  transition: background ${tokens.transition.fast};

  &:hover {
    background: ${tokens.colors.neutral[50]};
  }
`;

const CtaLoadMoreContainerMargin = styled.div`
  margin-top: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[10]};
`;

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const SkeletonCard = styled.div`
  background: linear-gradient(
    90deg,
    ${tokens.colors.neutral[100]} 25%,
    ${tokens.colors.neutral[200]} 50%,
    ${tokens.colors.neutral[100]} 75%
  );
  background-size: 200% 100%;
  border-radius: ${tokens.radius.lg};
  overflow: hidden;
  height: 340px;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing[4]};
  padding: ${tokens.spacing[16]} ${tokens.spacing[6]};
  color: ${tokens.colors.neutral[400]};
  text-align: center;
`;

const EmptyStateTitle = styled.p`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[600]};
  margin: 0;
`;

const EmptyStateSubtitle = styled.p`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[400]};
  margin: 0;
`;

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
      <CategoryFilterContainerMargin>
        <CategoryFilter selectedId={categoryId} onChange={handleCategoryChange} />
      </CategoryFilterContainerMargin>

      {!isLoading && products.length > 0 && (
        <ToolbarRow>
          <ResultCount>{totalElements} produto(s) encontrado(s)</ResultCount>
          <SortWrapper ref={sortRef}>
            <SortButton onClick={() => setSortOpen((prev) => !prev)}>
              <ArrowUpDown size={14} />
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
            </SortButton>
            <SortDropdown $open={sortOpen}>
              {SORT_OPTIONS.map((opt) => (
                <SortOption
                  key={opt.value}
                  $active={sort === opt.value}
                  onClick={() => handleSortChange(opt.value)}
                >
                  {sort === opt.value && <Check size={13} />}
                  {opt.label}
                </SortOption>
              ))}
            </SortDropdown>
          </SortWrapper>
        </ToolbarRow>
      )}

      {isLoading ? (
        <ProductsCardsGridContainer>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ProductsCardsGridContainer>
      ) : products.length === 0 ? (
        <EmptyState>
          <SearchX size={48} strokeWidth={1.5} />
          <EmptyStateTitle>Nenhum produto encontrado</EmptyStateTitle>
          <EmptyStateSubtitle>
            Tente outros termos ou remova os filtros aplicados.
          </EmptyStateSubtitle>
        </EmptyState>
      ) : (
        <ProductsCardsGridContainer>
          {products.map((product) => (
            <CardLink key={product.id} to={`/product-details/${product.id}`}>
              <ProductCatalogCard product={product} />
            </CardLink>
          ))}
        </ProductsCardsGridContainer>
      )}

      {!isLoading && !isLast && (
        <CtaLoadMoreContainerMargin onClick={handleNextPage}>
          <CtaLoadMore />
        </CtaLoadMoreContainerMargin>
      )}
    </>
  );
};

export { Catalog };
