import styled from "styled-components";
import { useState } from "react";
import { CredentialsDTO } from "../../../models/auth";
import { loginRequest } from "../../../services/auth-service";

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

  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: ""
  })

  function handleFormSubmit(e: any){
    e.preventDefault()
    loginRequest(formData)
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
