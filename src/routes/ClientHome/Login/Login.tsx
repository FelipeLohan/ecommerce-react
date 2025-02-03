import styled from "styled-components";
import { LoginCard } from "../../../components/LoginCard";
import { useState } from "react";
import { CredentialsDTO } from "../../../models/auth";
import { loginRequest } from "../../../services/auth-service";

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

  return (
    <>
      <LoginContainer>
        <LoginCard handleFormSubmit={handleFormSubmit} />
      </LoginContainer>
    </>
  );
};

export { Login };
