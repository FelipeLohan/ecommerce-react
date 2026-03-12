import { useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../components/Forminput";
import { useContext, useEffect, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as productService from "../../../services/product-service.ts";
import * as categoryService from "../../../services/category-service.ts";
import { FormTextArea } from "../../../components/FormTextArea/FormTextArea.tsx";
import { CategoryDTO } from "../../../models/category.ts";
import { FormSelect } from "../../../components/FormSelect/FormSelect.tsx";
import { CtaButton } from "../../../components/CtaButton";
import { ContextToast } from "../../../utils/context-toast.ts";

const ProductForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const isEditing = params.productId !== "create";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Ex: Camiseta Básica Preta",
      validation: function (value: string) {
        return value.length >= 3 && value.length <= 80;
      },
      message: "Informe um nome de 3 até 80 caracteres",
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "0,00",
      validation: function (value: string) {
        return Number(value) > 0;
      },
      message: "O valor deve ser maior que 0",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "https://...",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descreva o produto em detalhes...",
      validation: function (value: string) {
        return value.length >= 10;
      },
      message: "A descrição deve ter pelo menos 10 caracteres",
    },
    categories: {
      value: [] as CategoryDTO[],
      id: "categories",
      name: "categories",
      placeholder: "Selecione as categorias...",
      validation: function (value: CategoryDTO[]) {
        return value.length > 0;
      },
      message: "Escolha ao menos uma categoria",
    },
  });

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    categoryService
      .findAllRequest()
      .then((response) => setCategories(response.data));
  }, []);

  useEffect(() => {
    if (isEditing) {
      productService
        .findById(Number(params.productId))
        .then((response) =>
          setFormData(forms.updateAll(formData, response.data))
        );
    }
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const result = forms.updateAndValidate(formData, e.target.name, e.target.value);
    setFormData(result);
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = Object.values(formData).every((field) =>
      "validation" in field ? field.validation(field.value as never) : true
    );

    if (!isValid) {
      console.log("Formulário inválido, verifique os campos!");
      return;
    }

    const requestBody = forms.toValues(formData);
    setIsSubmitting(true);

    if (isEditing) {
      requestBody.id = params.productId;
      productService
        .updateRequest(requestBody)
        .then(() => {
          addToast("success", "Produto salvo com sucesso!");
          navigate("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          addToast("error", "Erro ao salvar produto.");
        })
        .finally(() => setIsSubmitting(false));
    } else {
      productService
        .insertRequest(requestBody)
        .then(() => {
          addToast("success", "Produto criado com sucesso!");
          navigate("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          addToast("error", "Erro ao criar produto.");
        })
        .finally(() => setIsSubmitting(false));
    }
  }

  const sectionLabel = "text-xs font-semibold text-neutral-500 uppercase tracking-[0.05em] pb-2 border-b border-neutral-100 m-0 mb-4";
  const fieldError = "text-xs text-danger-500";

  return (
    <div className="max-w-[700px] mx-auto px-6 pb-10">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-neutral-100">
          <h1 className="text-xl font-bold text-neutral-900 m-0">
            {isEditing ? "Editar produto" : "Novo produto"}
          </h1>
        </div>

        <form onSubmit={handleSubmitForm}>
          {/* Body */}
          <div className="px-8 py-8 flex flex-col gap-6">
            {/* Section 1 — Basic info */}
            <div>
              <p className={sectionLabel}>Informações básicas</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-neutral-700">
                    Nome <span className="text-danger-500 ml-0.5">*</span>
                  </label>
                  <FormInput {...formData.name} onChange={handleInputChange} />
                  {formData.name.value && !formData.name.validation(formData.name.value) && (
                    <span className={fieldError}>{formData.name.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="price" className="text-sm font-medium text-neutral-700">
                    Preço (R$) <span className="text-danger-500 ml-0.5">*</span>
                  </label>
                  <FormInput {...formData.price} onChange={handleInputChange} />
                  {formData.price.value && !formData.price.validation(formData.price.value) && (
                    <span className={fieldError}>{formData.price.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="description" className="text-sm font-medium text-neutral-700">
                    Descrição <span className="text-danger-500 ml-0.5">*</span>
                  </label>
                  <FormTextArea {...formData.description} onChange={handleInputChange} />
                  {formData.description.value && !formData.description.validation(formData.description.value) && (
                    <span className={fieldError}>{formData.description.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2 — Media */}
            <div>
              <p className={sectionLabel}>Mídia</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="imgUrl" className="text-sm font-medium text-neutral-700">URL da imagem</label>
                  <FormInput {...formData.imgUrl} onChange={handleInputChange} />
                </div>
                {formData.imgUrl.value && (
                  <img
                    src={formData.imgUrl.value}
                    alt="Preview"
                    className="w-full max-h-[200px] object-cover rounded-md border border-neutral-100 block"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
                  />
                )}
              </div>
            </div>

            {/* Section 3 — Categories */}
            <div>
              <p className={sectionLabel}>Categorias</p>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="categories" className="text-sm font-medium text-neutral-700">
                  Categorias <span className="text-danger-500 ml-0.5">*</span>
                </label>
                <FormSelect
                  {...formData.categories}
                  options={categories}
                  isMulti
                  onChange={(obj: CategoryDTO[]) => {
                    const newFormData = forms.updateAndValidate(formData, "categories", obj);
                    setFormData(newFormData);
                  }}
                  getOptionLabel={(obj: CategoryDTO) => obj.name}
                  getOptionValue={(obj: CategoryDTO) => String(obj.id)}
                />
                <span className="text-xs text-neutral-400">Segure Ctrl para selecionar múltiplas categorias.</span>
                {formData.categories.value.length === 0 && (
                  <span className={fieldError}>{formData.categories.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-neutral-100 flex justify-end items-center gap-3">
            <p className="text-xs text-neutral-400 m-0 mr-auto">* Campos obrigatórios</p>
            <CtaButton
              variant="secondary"
              type="button"
              onClick={() => navigate("/admin/products")}
            >
              Cancelar
            </CtaButton>
            <CtaButton variant="primary" type="submit" isLoading={isSubmitting}>
              {isEditing ? "Salvar alterações" : "Criar produto"}
            </CtaButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ProductForm };
