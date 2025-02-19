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

  @media (max-width: 600px) {
    h1 {
      font-size: 3.5vmin;
    }
  }

  @media (max-width: 420px) {
    justify-content: center;
    gap: 30px;

    h1 {
      font-size: 4vmin;
    }
  }
`;

const LoginCartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  a {
    color: #636363;
  }

  @media (max-width: 600px) {
    width: 130px;

    a {
      font-size: 2.5vmin;
    }

    img {
      width: 20px;
    }

    @media (max-width: 420px) {
      img {
        width: 20px;
      }
    }
  }
`;

const HeaderClient = () => {
  const { contextTokenPayload } = useContext(ContextToken);

  return (
    <>
      <HeaderClientContainer>
        <Link to="/">
          <div>
            <h1>Ecommerce</h1>
          </div>
        </Link>
        <LoginCartContainer>
          {contextTokenPayload && authService.hasAnyRoles(["ROLE_ADMIN"]) && (
            <Link to="/admin">
              <img src={AdminIcon} alt="" />
            </Link>
          )}
          <Link to="/cart">
            <CartIcon />
          </Link>
          <LoggedUser />
        </LoginCartContainer>
      </HeaderClientContainer>
    </>
  );
};

export { HeaderClient };
