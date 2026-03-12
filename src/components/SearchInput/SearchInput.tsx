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
      className="flex items-center bg-neutral-50 border-[1.5px] border-neutral-200 rounded-full overflow-hidden transition-[border-color,box-shadow,background] duration-[150ms] focus-within:border-primary-400 focus-within:shadow-[0_0_0_3px_var(--color-primary-100)] focus-within:bg-white"
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        placeholder="Buscar produtos..."
        className="flex-1 py-2 px-4 text-sm text-neutral-800 bg-transparent border-none outline-none min-w-0 placeholder:text-neutral-400"
      />

      {inputValue && (
        <button
          type="reset"
          onClick={handleReset}
          aria-label="Limpar"
          className="flex items-center justify-center px-2 py-2 bg-transparent text-neutral-400 border-none cursor-pointer transition-colors duration-[150ms] hover:text-neutral-600"
        >
          <X size={14} />
        </button>
      )}

      <button
        type="submit"
        aria-label="Buscar"
        className="flex items-center justify-center px-3.5 py-2 bg-transparent border-none text-neutral-400 cursor-pointer flex-shrink-0 transition-colors duration-[150ms] hover:text-primary-600"
      >
        <Search size={16} />
      </button>
    </form>
  );
};

export { SearchInput };
