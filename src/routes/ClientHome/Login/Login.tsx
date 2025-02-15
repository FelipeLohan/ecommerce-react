import styled from "styled-components";
import { useContext, useState } from "react";
import { CredentialsDTO } from "../../../models/auth";
import * as forms from "../../../utils/forms.ts";
import * as authService from "../../../services/auth-service.ts";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token.ts";
import { FormInput } from "../../../components/Forminput/FormInput.tsx";

const LoginCardContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 30%;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 auto;

  h2 {
    color: #636363;
    font-size: 4vmin;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 30px;
  }

  form input,
  button {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    outline: none;
  }

  form input {
    border: 1px solid #d9d9d9;
  }

  form button {
    background-color: #3483fa;
    color: #fff;
    font-size: 2.2vmin;
    border: none;
  }
`;

const LoginContainer = styled.div`
  margin-top: 10%;
`;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Email",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value.toLowerCase()
        );
      },
      message: "Favor informar um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
    },
  });

  const { setContextTokenPayload } = useContext(ContextToken);

  function handleFormSubmit(e: any) {
    e.preventDefault();
    authService
      .loginRequest(forms.toValues(formData))
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        navigate("/cart");
      })
      .catch((error) => {
        console.log("Erro no login", error);
      });
  }

  function handleInputChange(e: any) {
    const result = forms.updateAndValidate(
      formData,
      e.target.name,
      e.target.value
    );
    setFormData(result);
  }



  return (
    <>
      <LoginContainer>
        <LoginCardContainer>
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <FormInput
              {...formData.username}
              className="form-control"
              onChange={handleInputChange}
            />
             <span className="form-error">{formData.username.message}</span>
            <FormInput
              {...formData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Entrar</button>
          </form>
        </LoginCardContainer>
      </LoginContainer>
    </>
  );
};

export { Login };
