import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormInput } from "../../../components/Forminput";
import { useEffect, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as productService from "../../../services/product-service.ts";
import * as categoryService from "../../../services/category-service.ts";
import { FormTextArea } from "../../../components/FormTextArea/FormTextArea.tsx";
import { CategoryDTO } from "../../../models/category.ts";
import { FormSelect } from "../../../components/FormSelect/FormSelect.tsx";

const ProductFormContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;

  @media (max-width: 800px){
    width: 60%;
  }

  @media (max-width: 600px){
    width: 80%;
  }

  @media (max-width: 420px){
    width: 90%;
  }
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  gap: 15px;

  input {
    width: 100%;
    padding: 15px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
  }

  input::placeholder {
    color: #d9d9d9;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 15px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    resize: none;
    outline: none;
  }

  textarea::placeholder {
    color: #d9d9d9;
  }

  h1 {
    color: #636363;
    font-weight: 400;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;

  a {
    width: 100%;
  }

  button {
    width: 100%;
    padding: 15px;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #3483fa;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 2.2vmin;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 15px;
  color: #3483fa;
  background-color: #fff;
  border: 1px solid #3483fa;
  border-radius: 8px;
  font-size: 2.2vmin;
  cursor: pointer;
`;

const ProductForm = () => {
  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.productId !== "create";

  useEffect(() => {
    if (isEditing) {
      productService
        .findById(Number(params.productId))
        .then((response) =>
          setFormData(forms.updateAll(formData, response.data))
        );
    }
  }, []);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function (value: string) {
        return value.length >= 3 && value.length <= 80;
      },
      message: "Infomar um nome de 3 até 80 caracteres",
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function (value: any) {
        return Number(value) > 0;
      },
      message: "O valor deve ser acima de 0",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "URL da Imagem",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function (value: string) {
        return value.length >= 10;
      },
      message: "A descrição deve ter pelo menos 10 caracteres",
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
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

  function handleInputChange(e: any) {
    const result = forms.updateAndValidate(
      formData,
      e.target.name,
      e.target.value
    );
    setFormData(result);
  }

  function handleSubmitForm(e: any) {
    e.preventDefault();

    // Verifica se todos os campos obrigatórios são válidos
    const isValid = Object.values(formData).every((field) =>
      "validation" in field ? field.validation(field.value) : true
    );

    if (!isValid) {
      console.log("Formulário inválido, verifique os campos!");
      return;
    }

    console.log("Formulário válido, enviando os dados...");
    const requestBody = forms.toValues(formData);
    if (isEditing) {
      requestBody.id = params.productId;
      productService.updateRequest(requestBody).then(() => {
        navigate("/admin/products");
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      productService.insertRequest(requestBody)
        .then(() => {
          navigate("/admin/products");
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <ProductFormContainer>
        <FormContainer onSubmit={handleSubmitForm}>
          <h1>DADOS DO PRODUTO</h1>
          <FormInput
            {...formData.name}
            className="form-control"
            onChange={handleInputChange}
          />
          <span className="form-error">{formData.name.message}</span>
          <FormInput
            {...formData.price}
            className="form-control"
            onChange={handleInputChange}
          />
          <span className="form-error">{formData.price.message}</span>
          <FormInput {...formData.imgUrl} onChange={handleInputChange} />
          <FormSelect
            {...formData.categories}
            className="form-control"
            options={categories}
            isMulti
            onChange={(obj: any) => {
              const newFormData = forms.updateAndValidate(
                formData,
                "categories",
                obj
              );
              setFormData(newFormData);
            }}
            getOptionLabel={(obj: any) => obj.name}
            getOptionValue={(obj: any) => String(obj.id)}
          />
          <span className="form-error">{formData.categories.message}</span>
          <FormTextArea
            {...formData.description}
            className="form-control"
            onChange={handleInputChange}
          />
          <span className="form-error">{formData.description.message}</span>
          <ButtonsContainer>
            <Link to="/admin/products">
              <CancelButton>Cancelar</CancelButton>
            </Link>
            <SaveButton type="submit">Salvar</SaveButton>
          </ButtonsContainer>
        </FormContainer>
      </ProductFormContainer>
    </>
  );
};

export { ProductForm };
