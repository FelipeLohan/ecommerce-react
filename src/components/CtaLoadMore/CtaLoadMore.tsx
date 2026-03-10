import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const CtaLoadMoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;


  button {
    padding: 16px;
    width: 100%;
    font-size: ${tokens.fontSize.base};
    color: #3483FA;
    border: 1px solid #3483FA;
    background-color: #E8E8E8;
    border-radius: 8px;
    cursor: pointer;
  }

  @media (max-width: 420px){
  button{
  font-size: ${tokens.fontSize.xl};
  }
  width: 70%;
}
`;

const CtaLoadMore = () => {
  return (
    <>
      <CtaLoadMoreContainer>
        <button>Carregar mais</button>
      </CtaLoadMoreContainer>
    </>
  );
};

export { CtaLoadMore };
