import styled, { keyframes } from "styled-components";
import * as authService from "../../services/auth-service.ts";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { User, LogOut } from "lucide-react";
import { tokens } from "../../styles/tokens.ts";

/* ── Animations ──────────────────────────────────────────── */
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Styled components ───────────────────────────────────── */
const AvatarWrapper = styled.div`
  position: relative;
`;

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

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 200px;
  background: #ffffff;
  border: 1px solid ${tokens.colors.neutral[100]};
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.xl};
  overflow: hidden;
  z-index: 200;
  animation: ${fadeSlideIn} 180ms ease;
`;

const UserInfo = styled.div`
  padding: 12px 16px;
  background: ${tokens.colors.neutral[50]};

  span {
    display: block;
    font-size: ${tokens.fontSize.sm};
    font-weight: ${tokens.fontWeight.semibold};
    color: ${tokens.colors.neutral[800]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${tokens.colors.neutral[100]};
`;

const DropdownItem = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${({ $danger }) =>
    $danger ? tokens.colors.danger[600] : tokens.colors.neutral[700]};
  cursor: pointer;
  text-align: left;
  transition: background-color ${tokens.transition.fast}, color ${tokens.transition.fast};

  &:hover {
    background: ${({ $danger }) =>
      $danger ? tokens.colors.danger[50] : tokens.colors.neutral[50]};
    color: ${({ $danger }) =>
      $danger ? tokens.colors.danger[700] : tokens.colors.neutral[900]};
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

/* ── Component ───────────────────────────────────────────── */
const LoggedUser = () => {
  const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {
    authService.logout();
    setContextTokenPayload(undefined);
    setIsOpen(false);
  }

  function handleMyAccount() {
    setIsOpen(false);
    navigate("/my-account");
  }

  if (contextTokenPayload && authService.isAuthenticated()) {
    const initial = contextTokenPayload.user_name?.charAt(0) ?? "U";
    return (
      <AvatarWrapper ref={wrapperRef}>
        <Avatar
          onClick={() => setIsOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          title={contextTokenPayload.user_name}
        >
          {initial}
        </Avatar>

        {isOpen && (
          <DropdownMenu role="menu">
            <UserInfo>
              <span>{contextTokenPayload.user_name}</span>
            </UserInfo>

            <DropdownDivider />

            <DropdownItem onClick={handleMyAccount} role="menuitem">
              <User size={15} />
              Minha conta
            </DropdownItem>

            <DropdownDivider />

            <DropdownItem $danger onClick={handleLogout} role="menuitem">
              <LogOut size={15} />
              Sair
            </DropdownItem>
          </DropdownMenu>
        )}
      </AvatarWrapper>
    );
  }

  return <LoginLink to="/login">Entrar</LoginLink>;
};

export { LoggedUser };
