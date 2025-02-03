import styled from "styled-components";
import { LoginCard } from "../../components/LoginCard";

const LoginContainer = styled.div`
  margin-top: 10%;
`;

const Login = () => {
  return (
    <>
      <LoginContainer>
        <LoginCard />
      </LoginContainer>
    </>
  );
};

export { Login };
