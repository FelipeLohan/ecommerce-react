import styled from "styled-components";

const ButtonContainer = styled.div`


  button {
    padding: 16px 5%;
    background-color: #3483fa;
    color: #ffffff;
    border-radius: 12px;
    border: 1px solid #3483fa;
    font-size: 2.2vmin;
    cursor: pointer;
  }
`;

const CtaButton = () => {
  return (
    <>
      <ButtonContainer>
        <button>Inicio</button>
      </ButtonContainer>
    </>
  );
};

export { CtaButton };
