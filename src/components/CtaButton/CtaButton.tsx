import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";



type Props = {
  text: string;
  primaryColor: string;
  secondaryColor: string;
  handleClick: any;
}

const CtaButton = ({text, primaryColor, secondaryColor, handleClick}: Props) => {

  const ButtonContainer = styled.div`
  button {
    width: 220px;
    height: 50px;
    background-color: ${primaryColor};
    color: ${secondaryColor};
    border-radius: 12px;
    border: 1px solid ${primaryColor};
    font-size: ${tokens.fontSize.base};
    cursor: pointer;
  }

  @media (max-width: 600px){
    button{
      font-size: ${tokens.fontSize.lg};
    }
  }

  @media (max-width: 420px){
    button{
      font-size: ${tokens.fontSize["2xl"]};
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
