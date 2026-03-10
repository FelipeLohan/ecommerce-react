import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { CartIcon } from "../CartIcon";
import AdminIcon from "../../assets/AdminIcon.svg";
import * as authService from "../../services/auth-service.ts";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { LoggedUser } from "../LoggedUser/LoggedUser.tsx";
import { tokens } from "../../styles/tokens.ts";

const HeaderClientContainer = styled.header<{ $scrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${tokens.spacing[10]};
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid ${tokens.colors.neutral[100]};
  box-shadow: ${tokens.shadow.sm};
  transition: box-shadow ${tokens.transition.base};

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      box-shadow: ${tokens.shadow.md};
    `}

  @media (max-width: 420px) {
    padding: 0 ${tokens.spacing[4]};
  }
`;

const Logo = styled(Link)`
  font-size: ${tokens.fontSize.xl};
  font-weight: ${tokens.fontWeight.bold};
  color: ${tokens.colors.primary[600]};
  letter-spacing: -0.02em;
  text-decoration: none;

  &:hover {
    color: ${tokens.colors.primary[700]};
  }

  @media (max-width: 600px) {
    font-size: ${tokens.fontSize.lg};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[4]};
`;

const AdminLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: ${tokens.radius.md};
  transition: background-color ${tokens.transition.fast};

  &:hover {
    background-color: ${tokens.colors.neutral[100]};
  }

  img {
    width: 22px;
    height: 22px;

    @media (max-width: 600px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: ${tokens.radius.md};
  transition: background-color ${tokens.transition.fast};

  &:hover {
    background-color: ${tokens.colors.neutral[100]};
  }
`;

const HeaderClient = () => {
  const { contextTokenPayload } = useContext(ContextToken);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderClientContainer $scrolled={scrolled}>
      <Logo to="/">Ecommerce</Logo>
      <NavActions>
        {contextTokenPayload && authService.hasAnyRoles(["ROLE_ADMIN"]) && (
          <AdminLink to="/admin">
            <img src={AdminIcon} alt="Admin" />
          </AdminLink>
        )}
        <CartLink to="/cart">
          <CartIcon />
        </CartLink>
        <LoggedUser />
      </NavActions>
    </HeaderClientContainer>
  );
};

export { HeaderClient };
