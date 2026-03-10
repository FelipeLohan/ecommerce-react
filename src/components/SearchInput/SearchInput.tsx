import React, { useState } from "react";
import styled from "styled-components";
import { tokens } from "../../styles/tokens.ts";

const SearchInputContainer = styled.form`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  background: #ffffff;
  border: 1.5px solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.radius.full};
  overflow: hidden;
  transition: border-color ${tokens.transition.fast}, box-shadow ${tokens.transition.fast};

  &:focus-within {
    border-color: ${tokens.colors.primary[400]};
    box-shadow: 0 0 0 3px ${tokens.colors.primary[100]};
  }

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const SearchIcon = styled.span`
  padding: 0 14px 0 16px;
  color: ${tokens.colors.neutral[400]};
  font-size: ${tokens.fontSize.base};
  pointer-events: none;
  user-select: none;
`;

const SearchField = styled.input`
  flex: 1;
  padding: 11px 8px;
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[800]};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${tokens.colors.neutral[400]};
  }
`;

const SearchButton = styled.button`
  padding: 11px 20px;
  background-color: ${tokens.colors.primary[600]};
  color: #ffffff;
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight.medium};
  border: none;
  cursor: pointer;
  border-radius: 0 ${tokens.radius.full} ${tokens.radius.full} 0;
  transition: background-color ${tokens.transition.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${tokens.colors.primary[700]};
  }
`;

const ClearButton = styled.button`
  padding: 11px 14px;
  background: transparent;
  color: ${tokens.colors.neutral[400]};
  font-size: ${tokens.fontSize.sm};
  border: none;
  cursor: pointer;
  transition: color ${tokens.transition.fast};

  &:hover {
    color: ${tokens.colors.neutral[600]};
  }
`;

type Props = {
  onSearch: (value: string) => void;
};

const SearchInput = ({ onSearch }: Props) => {
  const [inputValue, setInputValue] = useState("");

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(inputValue);
  }

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setInputValue("");
    onSearch("");
  }

  return (
    <SearchInputContainer onSubmit={handleSubmit}>
      <SearchIcon>🔍</SearchIcon>
      <SearchField
        onChange={handleInputValue}
        value={inputValue}
        type="text"
        placeholder="Nome do produto"
      />
      {inputValue && (
        <ClearButton onClick={handleReset} type="reset" aria-label="Limpar">
          ✕
        </ClearButton>
      )}
      <SearchButton type="submit">Buscar</SearchButton>
    </SearchInputContainer>
  );
};

export { SearchInput };
