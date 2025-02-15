import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormInput } from "../../../components/Forminput";
import { useEffect, useState } from "react";
import * as forms from "../../../utils/forms.ts";
import * as productService from "../../../services/product-service.ts";


const ProductFormContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  const isEditing = params.productId !== 'create';

  useEffect(() => {
    if(isEditing){
      productService.findById(Number(params.productId))
        .then(response => setFormData(forms.updateAll(formData, response.data)))
    }
  }, [])


  const [formData, setFormData] = useState({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome"
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function(value: any){
        return Number(value) > 0
      }
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "URL da Imagem"
    }
  })

   function handleInputChange(e: any) {
      const value = e.target.value;
      const name = e.target.name;
      setFormData(forms.update(formData, name, value));
    }

  return (
    <>
      <ProductFormContainer>
        <FormContainer>
          <h1>DADOS DO PRODUTO</h1>
          <FormInput 
            {...formData.name} 
            onChange={handleInputChange} 
            />
          <FormInput 
            {...formData.price} 
            onChange={handleInputChange} 
            />
          <FormInput 
            {...formData.imgUrl} 
            onChange={handleInputChange} 
            />
          <input type="text" placeholder="Categorias" />
          <input type="text" placeholder="Descrição" />
          <ButtonsContainer>
            <Link to="/admin/products">
              <CancelButton>Cancelar</CancelButton>
            </Link>
            <SaveButton>Salvar</SaveButton>
          </ButtonsContainer>
        </FormContainer>
      </ProductFormContainer>
    </>
  );
};

export { ProductForm };
