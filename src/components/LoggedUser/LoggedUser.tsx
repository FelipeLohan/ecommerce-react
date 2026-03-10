import styled from "styled-components";
import * as authService from "../../services/auth-service.ts";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { tokens } from "../../styles/tokens.ts";

const Avatar = styled.button`
  width: 34px;
  height: 34px;
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.primary[100]};
  color: ${tokens.colors.primary[700]};
  font-weight: ${tokens.fontWeight.semibold};
  font-size: ${tokens.fontSize.sm};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${tokens.transition.fast}, color ${tokens.transition.fast};
  text-transform: uppercase;
  line-height: 1;

  &:hover {
    background: ${tokens.colors.primary[200]};
    color: ${tokens.colors.primary[800]};
  }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.primary[500]};
    outline-offset: 2px;
  }
`;

const LoginLink = styled(Link)`
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[600]};
  text-decoration: none;
  padding: 6px 12px;
  border-radius: ${tokens.radius.md};
  border: 1.5px solid ${tokens.colors.neutral[300]};
  transition: border-color ${tokens.transition.fast}, color ${tokens.transition.fast},
    background-color ${tokens.transition.fast};

  &:hover {
    border-color: ${tokens.colors.primary[400]};
    color: ${tokens.colors.primary[600]};
    background-color: ${tokens.colors.primary[50]};
  }
`;

const LoggedUser = () => {
  const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

  function handleLogoutClick() {
    authService.logout();
    setContextTokenPayload(undefined);
  }

  if (contextTokenPayload && authService.isAuthenticated()) {
    const initial = contextTokenPayload.user_name?.charAt(0) ?? "U";
    return (
      <Avatar onClick={handleLogoutClick} title={`${contextTokenPayload.user_name} — Sair`}>
        {initial}
      </Avatar>
    );
  }

  return <LoginLink to="/login">Entrar</LoginLink>;
};

export { LoggedUser };
