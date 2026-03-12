import { CtaButton } from "../../../components/CtaButton";
import { SearchInput } from "../../../components/SearchInput";
import { ProductAdminListCard } from "../../../components/ProductAdminListCard";
import { CtaLoadMore } from "../../../components/CtaLoadMore";
import { useContext, useEffect, useState } from "react";
import * as productService from "../../../services/product-service.ts";
import { ProductDTO } from "../../../models/product";
import { DialogInfo } from "../../../components/DialogInfo/DialogInfo.tsx";
import { DialogConfirmation } from "../../../components/DialogConfirmation/DialogConfirmation.tsx";
import { useNavigate } from "react-router-dom";
import { ContextToast } from "../../../utils/context-toast.ts";

type QueryParams = {
  page: number;
  name: string;
};

const ProductListing = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const [isLast, setIsLast] = useState(false);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParam] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Sucesso!",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    message: "Tem certeza?",
    id: 0,
  });

  useEffect(() => {
    productService
      .findPageRequest(queryParams.page, queryParams.name, 0, "name,asc")
      .then((response) => {
        setIsLast(response.data.last);
        const nextPage = response.data.content;
        setProducts((prev) =>
          queryParams.page === 0 ? nextPage : prev.concat(nextPage)
        );
      });
  }, [queryParams]);

  function handleNewProductClick() {
    navigate("/admin/products/create");
  }

  function handleSearch(searchText: string) {
    setProducts([]);
    setQueryParam({ page: 0, name: searchText });
  }

  function handleNextPage() {
    setQueryParam((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  function handleDialogInfoClose() {
    setDialogInfoData((prev) => ({ ...prev, visible: false }));
  }

  function handleDeleteClick(productId: number) {
    setDialogConfirmationData({
      id: productId,
      visible: true,
      message: "Deseja excluir este produto permanentemente?",
    });
  }

  function handleUpdateClick(productId: number) {
    navigate(`/admin/products/${productId}`);
  }

  function handleDialogConfirmationAnswer(answer: boolean, productId: number) {
    if (answer) {
      productService
        .deleteById(productId)
        .then(() => {
          setProducts([]);
          setQueryParam((prev) => ({ ...prev, page: 0 }));
          addToast("success", "Produto removido com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          const msg = error.response?.data?.error ?? "Erro ao excluir produto.";
          addToast("error", msg);
          setDialogInfoData({ visible: true, message: msg });
        });
    }
    setDialogConfirmationData((prev) => ({ ...prev, visible: false }));
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 m-0">Produtos</h1>
        <CtaButton variant="primary" onClick={handleNewProductClick}>
          + Novo produto
        </CtaButton>
      </div>

      <div className="mb-5">
        <SearchInput onSearch={handleSearch} />
      </div>

      {/* Desktop table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["#", "Imagem", "Nome", "Preço", "Ações"].map((h) => (
                <th
                  key={h}
                  className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-[0.05em] px-4 py-3 text-left border-b border-neutral-100"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="[&:hover_td]:bg-neutral-50">
                <ProductAdminListCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imgUrl={product.imgUrl}
                  onDeleteClick={() => handleDeleteClick(product.id)}
                  onUpdateClick={() => handleUpdateClick(product.id)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-3 bg-white rounded-lg border border-neutral-100 shadow-sm p-3">
            <img src={product.imgUrl} alt={product.name} className="w-14 h-14 object-cover rounded-md flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-800 m-0 line-clamp-2 leading-snug">{product.name}</p>
              <p className="text-sm font-bold text-primary-600 m-0 mt-0.5">R$ {product.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => handleUpdateClick(product.id)}
                aria-label="Editar"
                title="Editar"
                className="w-9 h-9 flex items-center justify-center bg-transparent border-none rounded-md text-neutral-500 cursor-pointer transition-[color,background] duration-150 hover:bg-neutral-100 hover:text-primary-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button
                onClick={() => handleDeleteClick(product.id)}
                aria-label="Excluir"
                title="Excluir"
                className="w-9 h-9 flex items-center justify-center bg-transparent border-none rounded-md text-neutral-500 cursor-pointer transition-[color,background] duration-150 hover:bg-neutral-100 hover:text-danger-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isLast && (
        <div className="mt-5" onClick={handleNextPage}>
          <CtaLoadMore />
        </div>
      )}

      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      )}

      {dialogConfirmationData.visible && (
        <DialogConfirmation
          message={dialogConfirmationData.message}
          onDialogAnswer={handleDialogConfirmationAnswer}
          id={dialogConfirmationData.id}
        />
      )}
    </div>
  );
};

export { ProductListing };
