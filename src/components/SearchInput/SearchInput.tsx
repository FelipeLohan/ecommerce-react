import styled from "styled-components";

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  span {
    padding: 6px;
    background-color: #D9D9D9;
  }
  
  input{
    padding: 7px;
    width: 100%;
    background-color: #fff;
    outline: none;
    border: 1px solid #d9d9d9
  }
`


const SearchInput = () => {
  return(
    <>
      <SearchInputContainer>
        <span>🔎</span>
        <input type="text" placeholder="Nome do produto" />
        <span>X</span>
      </SearchInputContainer>
    </>
  )
}

export { SearchInput }