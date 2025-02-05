import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartIcon } from "../CartIcon";
import AdminIcon from "../../assets/AdminIcon.svg";
import * as authService from "../../services/auth-service.ts";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { LoggedUser } from "../LoggedUser/LoggedUser.tsx";

const HeaderClientContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;

  background-color: #ffe500;
  color: #636363;

  h1 {
    color: #636363;
  }
`;

const LoginCartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  a {
    color: #636363;
  }
`;

const HeaderClient = () => {

  const {contextTokenPayload} = useContext(ContextToken)

  return (
    <>
      <HeaderClientContainer>
        <Link to="/">
          <div>
            <h1>Ecommerce</h1>
          </div>
        </Link>
        <LoginCartContainer>
          {
          contextTokenPayload &&
          authService.hasAnyRoles(["ROLE_ADMIN"]) && (
            <Link to="/admin">
              <img src={AdminIcon} alt="" />
            </Link>
          )}
          <Link to="/cart">
            <CartIcon />
          </Link>
          <LoggedUser/>
        </LoginCartContainer>
      </HeaderClientContainer>
    </>
  );
};

export { HeaderClient };
