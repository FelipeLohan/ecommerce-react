import styled from "styled-components";
import HomeIcon from "../../assets/homeIcon.svg";
import StockIcon from "../../assets/stockIcon.svg";

const HeaderAdminContainer = styled.header`
  padding: 40px 0px;
  background-color: #0caf1d;
`;

const HeaderAdminContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

const LogoContainer = styled.div`
  font-size: 4vmin;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  p {
    font-size: 2.5vmin;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  gap: 20px;

`;
const ProductsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
              <p>Inicio</p>
            </HomeContainer>
            <ProductsContainer>
              <img src={StockIcon} alt="Stock Icon" />
              <p>Produtos</p>
            </ProductsContainer>
            <UserContainer>
              <p>Email</p>
              <p>Senha</p>
            </UserContainer>
          </CategoryContainer>
        </HeaderAdminContent>
      </HeaderAdminContainer>
    </>
  );
};

export { HeaderAdmin };
