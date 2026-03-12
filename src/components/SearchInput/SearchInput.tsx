import React, { useState } from "react";
import { Search, X } from "lucide-react";

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
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-[90%] mx-auto bg-white border-[1.5px] border-neutral-200 rounded-full overflow-hidden transition-[border-color,box-shadow] duration-[150ms] focus-within:border-primary-400 focus-within:shadow-[0_0_0_3px_var(--color-primary-100)] max-[420px]:w-full"
    >
      <span className="pl-4 pr-3.5 text-neutral-400 pointer-events-none select-none">
        <Search size={16} />
      </span>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Nome do produto"
        className="flex-1 py-[11px] px-2 text-sm text-neutral-800 bg-transparent border-none outline-none placeholder:text-neutral-400"
      />

      {inputValue && (
        <button
          type="reset"
          onClick={handleReset}
          aria-label="Limpar"
          className="px-3.5 py-[11px] bg-transparent text-neutral-400 border-none cursor-pointer transition-colors duration-[150ms] hover:text-neutral-600"
        >
          <X size={14} />
        </button>
      )}

      <button
        type="submit"
        className="px-5 py-[11px] bg-primary-600 text-white text-sm font-medium border-none cursor-pointer rounded-r-full whitespace-nowrap transition-colors duration-[150ms] hover:bg-primary-700"
      >
        Buscar
      </button>
    </form>
  );
};

export { SearchInput };
