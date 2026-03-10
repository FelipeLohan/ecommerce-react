import styled from "styled-components";
import HomeIcon from "../../assets/HomeIcon.svg";
import StockIcon from "../../assets/StockIcon.svg";
import { LoggedUser } from "../LoggedUser";
import { NavLink } from "react-router-dom";
import { tokens } from "../../styles/tokens.ts";

const HeaderAdminContainer = styled.header`
  background: ${tokens.colors.neutral[900]};
  margin-bottom: ${tokens.spacing[10]};
`;

const HeaderAdminContent = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    width: 92%;
  }
`;

const Brand = styled.div`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.bold};
  color: #ffffff;
  letter-spacing: -0.01em;
`;

const AdminBadge = styled.span`
  display: inline-block;
  background: ${tokens.colors.primary[600]};
  color: #ffffff;
  padding: 2px 10px;
  border-radius: ${tokens.radius.full};
  font-size: ${tokens.fontSize.xs};
  font-weight: ${tokens.fontWeight.semibold};
  margin-left: ${tokens.spacing[2]};
  vertical-align: middle;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${tokens.spacing[8]};
  align-items: center;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[2]};
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  color: ${tokens.colors.neutral[400]};
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color ${tokens.transition.fast}, border-color ${tokens.transition.fast};

  img {
    width: 20px;
    height: 20px;
    opacity: 0.6;
    transition: opacity ${tokens.transition.fast};

    @media (max-width: 600px) {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 420px) {
      width: 16px;
      height: 16px;
    }
  }

  span {
    @media (max-width: 800px) {
      display: none;
    }
  }

  &:hover {
    color: #ffffff;

    img {
      opacity: 1;
    }
  }

  &.active {
    color: #ffffff;
    border-bottom-color: ${tokens.colors.primary[400]};

    img {
      opacity: 1;
    }
  }
`;

const HeaderAdmin = () => {
  return (
    <HeaderAdminContainer>
      <HeaderAdminContent>
        <Brand>
          Admin
          <AdminBadge>painel</AdminBadge>
        </Brand>
        <NavLinks>
          <NavItem to="/admin/home" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={HomeIcon} alt="" />
            <span>Início</span>
          </NavItem>
          <NavItem to="/admin/products" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={StockIcon} alt="" />
            <span>Produtos</span>
          </NavItem>
          <LoggedUser />
        </NavLinks>
      </HeaderAdminContent>
    </HeaderAdminContainer>
  );
};

export { HeaderAdmin };
