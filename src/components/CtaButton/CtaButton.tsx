import styled from "styled-components";
import { Button } from "../../models/button";



type Props = {
  button: Button;
}

const CtaButton = ({button}: Props) => {

  const ButtonContainer = styled.div`
  button {
    padding: 16px 5%;
    background-color: ${button.primaryColor};
    color: ${button.secondaryColor};
    border-radius: 12px;
    border: 1px solid ${button.primaryColor};
    font-size: 2.2vmin;
    cursor: pointer;
  }
`;

  return (
    <>
      <ButtonContainer>
        <button>{button.text}</button>
      </ButtonContainer>
    </>
  );
};

export { CtaButton };
