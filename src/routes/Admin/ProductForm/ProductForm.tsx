import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormInput } from "../../../components/Forminput";
import { useContext, useEffect, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as productService from "../../../services/product-service.ts";
import * as categoryService from "../../../services/category-service.ts";
import { FormTextArea } from "../../../components/FormTextArea/FormTextArea.tsx";
import { CategoryDTO } from "../../../models/category.ts";
import { FormSelect } from "../../../components/FormSelect/FormSelect.tsx";
import { CtaButton } from "../../../components/CtaButton";
import { tokens } from "../../../styles/tokens.ts";
import { ContextToast } from "../../../utils/context-toast.ts";

/* ── Card ────────────────────────────────────────────────── */
const PageWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 24px 40px;
`;

const FormCard = styled.div`
  background: #ffffff;
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.md};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};
`;

const CardTitle = styled.h1`
  font-size: ${tokens.fontSize.xl};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.neutral[900]};
  margin: 0;
`;

const CardBody = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CardFooter = styled.div`
  padding: 20px 32px;
  border-top: 1px solid ${tokens.colors.neutral[100]};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

/* ── Section ─────────────────────────────────────────────── */
const SectionLabel = styled.p`
  font-size: ${tokens.fontSize.xs};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 8px;
  border-bottom: 1px solid ${tokens.colors.neutral[100]};
  margin: 0 0 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ── Field ───────────────────────────────────────────────── */
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[700]};

  .required {
    color: ${tokens.colors.danger[500]};
    margin-left: 2px;
  }
`;

const FieldError = styled.span`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.danger[500]};
`;

const FieldHint = styled.span`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.neutral[400]};
`;

/* ── Image preview ───────────────────────────────────────── */
const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: ${tokens.radius.md};
  border: 1px solid ${tokens.colors.neutral[100]};
  display: block;
`;

const RequiredNote = styled.p`
  font-size: ${tokens.fontSize.xs};
  color: ${tokens.colors.neutral[400]};
  margin: 0;
`;

/* ── Component ───────────────────────────────────────────── */
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

  return (
    <PageWrapper>
      <FormCard>
        <CardHeader>
          <CardTitle>{isEditing ? "Editar produto" : "Novo produto"}</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmitForm}>
          <CardBody>
            {/* Section 1 — Basic info */}
            <div>
              <SectionLabel>Informações básicas</SectionLabel>
              <Section>
                <FieldWrapper>
                  <FieldLabel htmlFor="name">
                    Nome <span className="required">*</span>
                  </FieldLabel>
                  <FormInput {...formData.name} onChange={handleInputChange} />
                  {formData.name.value && !formData.name.validation(formData.name.value) && (
                    <FieldError>{formData.name.message}</FieldError>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <FieldLabel htmlFor="price">
                    Preço (R$) <span className="required">*</span>
                  </FieldLabel>
                  <FormInput {...formData.price} onChange={handleInputChange} />
                  {formData.price.value && !formData.price.validation(formData.price.value) && (
                    <FieldError>{formData.price.message}</FieldError>
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <FieldLabel htmlFor="description">
                    Descrição <span className="required">*</span>
                  </FieldLabel>
                  <FormTextArea {...formData.description} onChange={handleInputChange} />
                  {formData.description.value && !formData.description.validation(formData.description.value) && (
                    <FieldError>{formData.description.message}</FieldError>
                  )}
                </FieldWrapper>
              </Section>
            </div>

            {/* Section 2 — Media */}
            <div>
              <SectionLabel>Mídia</SectionLabel>
              <Section>
                <FieldWrapper>
                  <FieldLabel htmlFor="imgUrl">URL da imagem</FieldLabel>
                  <FormInput {...formData.imgUrl} onChange={handleInputChange} />
                </FieldWrapper>
                {formData.imgUrl.value && (
                  <ImagePreview
                    src={formData.imgUrl.value}
                    alt="Preview"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
                  />
                )}
              </Section>
            </div>

            {/* Section 3 — Categories */}
            <div>
              <SectionLabel>Categorias</SectionLabel>
              <Section>
                <FieldWrapper>
                  <FieldLabel htmlFor="categories">
                    Categorias <span className="required">*</span>
                  </FieldLabel>
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
                  <FieldHint>Segure Ctrl para selecionar múltiplas categorias.</FieldHint>
                  {formData.categories.value.length === 0 && (
                    <FieldError>{formData.categories.message}</FieldError>
                  )}
                </FieldWrapper>
              </Section>
            </div>
          </CardBody>

          <CardFooter>
            <RequiredNote>* Campos obrigatórios</RequiredNote>
            <div style={{ display: "flex", gap: "12px" }}>
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
          </CardFooter>
        </form>
      </FormCard>
    </PageWrapper>
  );
};

export { ProductForm };
