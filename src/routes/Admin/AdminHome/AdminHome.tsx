import { useEffect, useState } from "react";
import styled from "styled-components";
import { UserDTO } from "../../../models/user";
import * as userService from "../../../services/user-service.ts";
import { tokens } from "../../../styles/tokens.ts";

const PageWrapper = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, ${tokens.colors.primary[600]}, ${tokens.colors.primary[800]});
  border-radius: ${tokens.radius.lg};
  padding: 40px 48px;
  color: #ffffff;
  margin-bottom: 32px;
`;

const WelcomeTitle = styled.h1`
  font-size: ${tokens.fontSize["3xl"]};
  font-weight: ${tokens.fontWeight.bold};
  margin: 0 0 8px;
  line-height: ${tokens.lineHeight.snug};
`;

const WelcomeSubtitle = styled.p`
  font-size: ${tokens.fontSize.base};
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
`;

const AdminHome = () => {
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe().then((response) => setUser(response.data));
  }, []);

  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <PageWrapper>
      <WelcomeCard>
        <WelcomeTitle>
          {firstName ? `Olá, ${firstName}! 👋` : "Bem-vindo ao painel!"}
        </WelcomeTitle>
        <WelcomeSubtitle>
          Gerencie seus produtos, categorias e pedidos pelo menu de navegação.
        </WelcomeSubtitle>
      </WelcomeCard>
    </PageWrapper>
  );
};

export { AdminHome };
