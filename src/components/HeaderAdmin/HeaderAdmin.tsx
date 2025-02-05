import styled from "styled-components";
import HomeIcon from "../../assets/homeIcon.svg";
import StockIcon from "../../assets/stockIcon.svg";
import { LoggedUser } from "../LoggedUser";

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

`;

const LogoContainer = styled.div`
  font-size: 4vmin;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  h3 {
    font-size: 3vmin;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  gap: 10px;

`;
const ProductsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;

  & h5{
    font-size: 2.5vmin;
    
  }
`;

const HeaderAdmin = () => {
  return (
    <>
      <HeaderAdminContainer>
        <HeaderAdminContent>
          <LogoContainer>Ecommerce</LogoContainer>
          <CategoryContainer>
            <HomeContainer>
              <img src={HomeIcon} alt="Home Icon" />
              <h3>Inicio</h3>
            </HomeContainer>
            <ProductsContainer>
              <img src={StockIcon} alt="Stock Icon" />
              <h3>Produtos</h3>
            </ProductsContainer>
              <LoggedUser/>
          </CategoryContainer>
        </HeaderAdminContent>
      </HeaderAdminContainer>
    </>
  );
};

export { HeaderAdmin };
