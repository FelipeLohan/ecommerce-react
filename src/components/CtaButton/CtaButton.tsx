import styled from "styled-components";



type Props = {
  text: string;
  primaryColor: string;
  secondaryColor: string;
  handleClick: any;
}

const CtaButton = ({text, primaryColor, secondaryColor, handleClick}: Props) => {

  const ButtonContainer = styled.div`
  button {
    width: 200px;
    height: 50px;
    background-color: ${primaryColor};
    color: ${secondaryColor};
    border-radius: 12px;
    border: 1px solid ${primaryColor};
    font-size: 2.2vmin;
    cursor: pointer;
  }

  @media (max-width: 600px){
    button{
      font-size: 2.7vmin;
    }
  }

  @media (max-width: 420px){
    button{
      font-size: 3.2vmin;
    }
  }
`;

  return (
    <>
      <ButtonContainer>
        <button onClick={handleClick} >{text}</button>
      </ButtonContainer>
    </>
  );
};

export { CtaButton };
