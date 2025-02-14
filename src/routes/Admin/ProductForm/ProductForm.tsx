import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <>
      <ProductFormContainer>
        <FormContainer>
          <h1>DADOS DO PRODUTO</h1>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Preço" />
          <input type="text" placeholder="Imagem" />
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
