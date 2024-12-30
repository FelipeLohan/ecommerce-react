import styled from "styled-components";

const CtaLoadMoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;


  button {
    padding: 16px;
    width: 100%;
    font-size: 2.2vmin;
    color: #3483FA;
    border: 1px solid #3483FA;
    background-color: #E8E8E8;
    border-radius: 12px;
    cursor: pointer;
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