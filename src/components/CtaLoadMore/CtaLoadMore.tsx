import styled from "styled-components";

const CtaLoadMoreContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;


  button {
    padding: 16px;
    width: 100%;
    font-size: 2.2vmin;
    color: #3483FA;
    border: 1px solid #3483FA;
    background-color: #E8E8E8;
    border-radius: 8px;
    cursor: pointer;
  }

  @media (max-width: 420px){
  button{
  font-size: 3vmin;
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
