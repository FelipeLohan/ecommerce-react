import styled from "styled-components";
import HomeIcon from "../../assets/HomeIcon.svg";
import StockIcon from "../../assets/StockIcon.svg";
import { LoggedUser } from "../LoggedUser";
import { NavLink } from "react-router-dom";
import "./style.css";

const HeaderAdminContainer = styled.header`
  padding: 40px 0px;
  background-color: #0caf1d;
  margin-bottom: 40px;
`;

const HeaderAdminContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  img {
    width: 30px;
  }

   @media (max-width: 600px){
    img{
      width: 25px;
    }
  }

  @media (max-width: 420px){
    img{
      width: 18px;
    }
  }
`;

const LogoContainer = styled.div`
  font-size: 3.5vmin;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  h3 {
    font-size: 2.2vmin;
  }

  a{
    color: #fff;
  }

  @media (max-width: 800px){
    h3{
      display: none;
    }
  }

  @media (max-width: 800px){
    gap: 20px;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  
`;
const ProductsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderAdmin = () => {
  return (
    <>
      <HeaderAdminContainer>
        <HeaderAdminContent>
          <LogoContainer>Admin</LogoContainer>
          <CategoryContainer>
            <NavLink to="/admin/home" className={({isActive}) => isActive ? "header-isActive" : ""}>
              <HomeContainer>
                <img src={HomeIcon} alt="Home Icon" />
                <h3>Inicio</h3>
              </HomeContainer>
            </NavLink>
            <NavLink to="/admin/products" className={({isActive}) => isActive ? "header-isActive" : ""}>
              <ProductsContainer>
                <img src={StockIcon} alt="Stock Icon" />
                <h3>Produtos</h3>
              </ProductsContainer>
            </NavLink>

            <LoggedUser />
          </CategoryContainer>
        </HeaderAdminContent>
      </HeaderAdminContainer>
    </>
  );
};

export { HeaderAdmin };
