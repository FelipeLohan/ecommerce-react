import styled from "styled-components";

const SearchInputContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  button {
    padding: 2vmin;
    background-color: #d9d9d9;
    border: none;
  }

  input {
    padding: 2vmin;
    width: 100%;
    background-color: #fff;
    outline: none;
    border: 1px solid #d9d9d9;
  }
`;

const SearchInput = () => {
  return (
    <>
      <SearchInputContainer>
          <button type="submit">🔎</button>
          <input type="text" placeholder="Nome do produto" />
          <button type="reset">X</button>
      </SearchInputContainer>
    </>
  );
};

export { SearchInput };
