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

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
