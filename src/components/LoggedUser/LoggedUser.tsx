import styled from "styled-components";
import * as authService from "../../services/auth-service.ts";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { tokens } from "../../styles/tokens.ts";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;

  & h5 {
    font-size: ${tokens.fontSize.lg};
    cursor: pointer;
  }

  @media (max-width: 600px) {
  h4{
  font-size: ${tokens.fontSize.lg};
  }

  h5{
  font-size: ${tokens.fontSize.base};
  }
}

@media (max-width: 420px){
  h4{
  font-size: ${tokens.fontSize.xl};
  }

  h5{
  font-size: ${tokens.fontSize.xl};
  }
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
