import { useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../components/Forminput";
import { useContext, useEffect, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as categoryService from "../../../services/category-service.ts";
import { CtaButton } from "../../../components/CtaButton";
import { ContextToast } from "../../../utils/context-toast.ts";

const CategoryForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { addToast } = useContext(ContextToast);
  const isEditing = params.categoryId !== "create";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Ex: Eletrônicos",
      validation: function (value: string) {
        return value.length >= 2 && value.length <= 60;
      },
      message: "Informe um nome de 2 até 60 caracteres",
    },
  });

  useEffect(() => {
    if (isEditing) {
      categoryService.findAllRequest().then((response) => {
        const category = (response.data as { id: number; name: string; isFeatured?: boolean }[])
          .find((c) => c.id === Number(params.categoryId));
        if (category) {
          setFormData(forms.updateAll(formData, category));
          setIsFeatured(category.isFeatured ?? false);
        } else {
          navigate("/admin/categories");
        }
      });
    }
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const result = forms.updateAndValidate(formData, e.target.name, e.target.value);
    setFormData(result);
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = Object.values(formData).every((field) =>
      "validation" in field ? field.validation(field.value as never) : true
    );

    if (!isValid) return;

    const requestBody = {
      ...forms.toValues(formData),
      isFeatured,
    };

    setIsSubmitting(true);

    if (isEditing) {
      requestBody.id = params.categoryId;
      categoryService
        .updateRequest(requestBody)
        .then(() => {
          addToast("success", "Categoria salva com sucesso!");
          navigate("/admin/categories");
        })
        .catch((err) => {
          console.log(err);
          addToast("error", "Erro ao salvar categoria.");
        })
        .finally(() => setIsSubmitting(false));
    } else {
      categoryService
        .insertRequest(requestBody)
        .then(() => {
          addToast("success", "Categoria criada com sucesso!");
          navigate("/admin/categories");
        })
        .catch((err) => {
          console.log(err);
          addToast("error", "Erro ao criar categoria.");
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
            {isEditing ? "Editar categoria" : "Nova categoria"}
          </h1>
        </div>

        <form onSubmit={handleSubmitForm}>
          {/* Body */}
          <div className="px-8 py-8 flex flex-col gap-6">
            <div>
              <p className={sectionLabel}>Informações</p>
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-neutral-700">
                    Nome <span className="text-danger-500 ml-0.5">*</span>
                  </label>
                  <FormInput {...formData.name} onChange={handleInputChange} />
                  {formData.name.value && !formData.name.validation(formData.name.value) && (
                    <span className={fieldError}>{formData.name.message}</span>
                  )}
                </div>

                {/* isFeatured toggle */}
                <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-neutral-200 bg-neutral-50">
                  <div>
                    <p className="text-sm font-medium text-neutral-700 m-0">Em destaque</p>
                    <p className="text-xs text-neutral-400 m-0 mt-0.5">
                      Categorias em destaque aparecem com maior visibilidade no catálogo.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isFeatured}
                    onClick={() => setIsFeatured((prev) => !prev)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 ${
                      isFeatured ? "bg-primary-600" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        isFeatured ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-neutral-100 flex justify-end items-center gap-3">
            <p className="text-xs text-neutral-400 m-0 mr-auto">* Campos obrigatórios</p>
            <CtaButton
              variant="secondary"
              type="button"
              onClick={() => navigate("/admin/categories")}
            >
              Cancelar
            </CtaButton>
            <CtaButton variant="primary" type="submit" isLoading={isSubmitting}>
              {isEditing ? "Salvar alterações" : "Criar categoria"}
            </CtaButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CategoryForm };
