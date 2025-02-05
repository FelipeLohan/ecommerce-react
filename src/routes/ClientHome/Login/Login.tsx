import styled from "styled-components";
import { useContext, useState } from "react";
import { CredentialsDTO } from "../../../models/auth";

import * as authService from "../../../services/auth-service.ts";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token.ts";

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

  h2{
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

  form input, button{
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    outline: none;
  }

  form input{
    border: 1px solid #D9D9D9;
    
  }

  form button{
  background-color: #3483FA;
  color: #fff;
  font-size: 2.2vmin;
  border: none;
  
  }
`;

const LoginContainer = styled.div`
  margin-top: 10%;
`;

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: ""
  })

   const {setContextTokenPayload} = useContext(ContextToken)

  function handleFormSubmit(e: any){
    e.preventDefault()
    authService.loginRequest(formData)
      .then(response => {
        authService.saveAccessToken(response.data.access_token)
        setContextTokenPayload(authService.getAccessTokenPayload())
        navigate("/cart")
      })
      .catch(error => {
        console.log("Erro no login", error)
      })
  }

  function handleInputChange(e: any){
    const value = e.target.value;
    const name = e.target.name;

    setFormData({...formData, [name]: value})
  }

  return (
    <>
      <LoginContainer>
      <LoginCardContainer>
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <input placeholder="Email" type="text" name="username" value={formData.username} onChange={handleInputChange} />
          <input placeholder="Senha" type="password" name="password" value={formData.password} onChange={handleInputChange} />
          <button type="submit">Entrar</button>
        </form>
      </LoginCardContainer>
      </LoginContainer>
    </>
  );
};

export { Login };
