/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
    cursor: pointer;
  }

  input {
    padding: 2vmin;
    width: 100%;
    background-color: #fff;
    outline: none;
    border: 1px solid #d9d9d9;
  }
`;

type Props = {
  onSearch: Function;
}

const SearchInput = ({onSearch}: Props) => {

  const [inputValue, setInputValue] = useState("");

  function handleInputValue(e: any){
    setInputValue(e.target.value)
  }

  function handleSubmit(e: any){
    e.preventDefault()
    onSearch(inputValue)
  }

  function handleReset(e: any){
    e.preventDefault()
    setInputValue("")
    onSearch("")
  }

  return (
    <>
      <SearchInputContainer onSubmit={handleSubmit}>
          <button type="submit">🔎</button>
          <input onChange={handleInputValue} value={inputValue} type="text" placeholder="Nome do produto" />
          <button onClick={handleReset} type="reset">X</button>
      </SearchInputContainer>
    </>
  );
};

export { SearchInput };
