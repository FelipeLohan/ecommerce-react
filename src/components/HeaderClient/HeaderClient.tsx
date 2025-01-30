import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartIcon } from "../CartIcon";

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
  return (
    <>
      <HeaderClientContainer>
        <Link to="/">
          <div>
            <h1>Ecommerce</h1>
          </div>
        </Link>
        <LoginCartContainer>
          <Link to="/cart">
            <CartIcon />
          </Link>
          <Link to="/login">Entrar</Link>
        </LoginCartContainer>
      </HeaderClientContainer>
    </>
  );
};

export { HeaderClient };
