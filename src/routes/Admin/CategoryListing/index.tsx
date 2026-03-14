import { CtaButton } from "../../../components/CtaButton";
import { CategoryAdminListCard } from "../../../components/CategoryAdminListCard";
import { useContext, useEffect, useState } from "react";
import * as categoryService from "../../../services/category-service.ts";
import { CategoryDTO } from "../../../models/category";
import { DialogInfo } from "../../../components/DialogInfo/DialogInfo.tsx";
import { DialogConfirmation } from "../../../components/DialogConfirmation/DialogConfirmation.tsx";
import { useNavigate } from "react-router-dom";
import { ContextToast } from "../../../utils/context-toast.ts";

const CategoryListing = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

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
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  function handleNewCategoryClick() {
    navigate("/admin/categories/create");
  }

  function handleUpdateClick(categoryId: number) {
    navigate(`/admin/categories/${categoryId}`);
  }

  function handleDeleteClick(categoryId: number) {
    setDialogConfirmationData({
      id: categoryId,
      visible: true,
      message: "Deseja excluir esta categoria permanentemente?",
    });
  }

  function handleDialogInfoClose() {
    setDialogInfoData((prev) => ({ ...prev, visible: false }));
  }

  function handleDialogConfirmationAnswer(answer: boolean, categoryId: number) {
    if (answer) {
      categoryService
        .deleteById(categoryId)
        .then(() => {
          setCategories((prev) => prev.filter((c) => c.id !== categoryId));
          addToast("success", "Categoria removida com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          const msg = error.response?.data?.message ?? error.response?.data?.error ?? "Erro ao excluir categoria.";
          addToast("error", msg);
          setDialogInfoData({ visible: true, message: msg });
        });
    }
    setDialogConfirmationData((prev) => ({ ...prev, visible: false }));
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 m-0">Categorias</h1>
        <CtaButton variant="primary" onClick={handleNewCategoryClick}>
          + Nova categoria
        </CtaButton>
      </div>

      {/* Desktop table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["#", "Nome", "Destaque", "Ações"].map((h) => (
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
            {categories.map((category) => (
              <tr key={category.id} className="[&:hover_td]:bg-neutral-50">
                <CategoryAdminListCard
                  id={category.id}
                  name={category.name}
                  isFeatured={category.isFeatured}
                  onDeleteClick={() => handleDeleteClick(category.id)}
                  onUpdateClick={() => handleUpdateClick(category.id)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-3 bg-white rounded-lg border border-neutral-100 shadow-sm p-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-800 m-0 leading-snug">
                {category.name}
              </p>
              <div className="mt-1">
                {category.isFeatured ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700">
                    Em destaque
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-500">
                    Padrão
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => handleUpdateClick(category.id)}
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
                onClick={() => handleDeleteClick(category.id)}
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

export { CategoryListing };
