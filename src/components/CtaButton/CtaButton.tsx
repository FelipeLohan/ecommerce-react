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
    padding: 16px 5%;
    background-color: ${primaryColor};
    color: ${secondaryColor};
    border-radius: 12px;
    border: 1px solid ${primaryColor};
    font-size: 2.2vmin;
    cursor: pointer;
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
