import styled from "styled-components";
import * as authService from "../../services/auth-service.ts";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;

  & h5 {
    font-size: 2.5vmin;
    cursor: pointer;
  }
`;

const LoggedUser = () => {
  const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

  function handleLogoutClick(){
    authService.logout() 
    setContextTokenPayload(undefined)
  } 

  return contextTokenPayload && authService.isAuthenticated() ? (
    <UserContainer>
      <h4>{contextTokenPayload?.user_name}</h4>
      <h5 onClick={handleLogoutClick} >Sair</h5>
    </UserContainer>
  ) : (
    <Link to="/login">Entrar</Link>
  );
};

export { LoggedUser };
