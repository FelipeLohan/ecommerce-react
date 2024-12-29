import styled from "styled-components";
import CartIcon from '../../assets/CartIcon.svg';

const HeaderClientContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;

  background-color: #FFE500 ;
  color: #636363;
`

const LoginCartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const HeaderClient = () => {
  return (
    <>
    <HeaderClientContainer>
      <div>
        <h1>Ecommerce</h1>
      </div>
      <LoginCartContainer>
        <img src={CartIcon} />
        <p>Entrar</p>
      </LoginCartContainer>
    </HeaderClientContainer>
    </>
  )
}

export { HeaderClient }