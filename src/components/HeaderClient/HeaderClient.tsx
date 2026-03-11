import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartIcon } from "../CartIcon";
import AdminIcon from "../../assets/AdminIcon.svg";
import * as authService from "../../services/auth-service.ts";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { LoggedUser } from "../LoggedUser/LoggedUser.tsx";
import { tokens } from "../../styles/tokens.ts";
import { Search } from "lucide-react";

const HeaderClientContainer = styled.header<{ $scrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${tokens.spacing[4]};
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
    gap: ${tokens.spacing[2]};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 36px;
    width: auto;
    display: block;
    transition: opacity ${tokens.transition.fast};

    @media (max-width: 600px) {
      height: 28px;
    }
  }

  &:hover img {
    opacity: 0.85;
  }
`;

const SearchForm = styled.form`
  flex: 1;
  max-width: 520px;
  display: flex;
  align-items: center;
  background: ${tokens.colors.neutral[50]};
  border: 1.5px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.full};
  overflow: hidden;
  transition: border-color ${tokens.transition.fast}, box-shadow ${tokens.transition.fast};

  &:focus-within {
    border-color: ${tokens.colors.primary[400]};
    box-shadow: 0 0 0 3px ${tokens.colors.primary[100]};
    background: #ffffff;
  }

  @media (max-width: 420px) {
    max-width: none;
  }
`;

const SearchField = styled.input`
  flex: 1;
  padding: 8px ${tokens.spacing[3]};
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[800]};
  background: transparent;
  border: none;
  outline: none;
  min-width: 0;

  &::placeholder {
    color: ${tokens.colors.neutral[400]};
  }
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  background: transparent;
  border: none;
  color: ${tokens.colors.neutral[400]};
  cursor: pointer;
  transition: color ${tokens.transition.fast};
  flex-shrink: 0;

  &:hover {
    color: ${tokens.colors.primary[600]};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[4]};
  flex-shrink: 0;
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
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("name") ?? "");
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync input when URL param changes externally (e.g. navigating back)
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    setInputValue(searchParams.get("name") ?? "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/catalog?name=${encodeURIComponent(inputValue.trim())}`);
  }

  return (
    <HeaderClientContainer $scrolled={scrolled}>
      <Logo to="/">
        <img src="/Brand.svg" alt="Ecommerce" />
      </Logo>

      <SearchForm onSubmit={handleSubmit}>
        <SearchField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Buscar produtos..."
        />
        <SearchIconButton type="submit" aria-label="Buscar">
          <Search size={16} />
        </SearchIconButton>
      </SearchForm>

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
