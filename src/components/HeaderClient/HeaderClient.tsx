import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CartIcon } from "../CartIcon";
import AdminIcon from "../../assets/AdminIcon.svg";
import * as authService from "../../services/auth-service.ts";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { LoggedUser } from "../LoggedUser/LoggedUser.tsx";
import { Search } from "lucide-react";
import { cn } from "../../lib/cn.ts";

const HeaderClient = () => {
  const { contextTokenPayload } = useContext(ContextToken);
  const [scrolled, setScrolled] = useState(false);
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("name") ?? "");
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync input when URL param changes externally (e.g. navigating back)
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    setInputValue(searchParams.get("name") ?? "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/catalog?name=${encodeURIComponent(inputValue.trim())}`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-[100]",
        "bg-white/85 backdrop-blur-[8px] border-b border-neutral-100",
        "transition-shadow duration-[250ms]",
        scrolled ? "shadow-md" : "shadow-sm",
        "px-10 md:px-6 sm:px-4"
      )}
    >
      {/* Row 1: logo + actions */}
      <div className="flex justify-between items-center gap-4 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 group">
          <img
            src="/Brand.svg"
            alt="Ecommerce"
            className="h-9 w-auto block transition-opacity duration-[150ms] group-hover:opacity-85 sm:h-7"
          />
        </Link>

        {/* Search form — hidden on mobile (shown below) */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 max-w-[520px] hidden sm:flex items-center bg-neutral-50 border-[1.5px] border-neutral-200 rounded-full overflow-hidden transition-[border-color,box-shadow,background] duration-[150ms] focus-within:border-primary-400 focus-within:shadow-[0_0_0_3px_var(--color-primary-100)] focus-within:bg-white"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Buscar produtos..."
            className="flex-1 py-2 px-3 text-sm text-neutral-800 bg-transparent border-none outline-none min-w-0 placeholder:text-neutral-400"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="flex items-center justify-center px-3.5 py-2 bg-transparent border-none text-neutral-400 cursor-pointer flex-shrink-0 transition-colors duration-[150ms] hover:text-primary-600"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Actions */}
        <nav className="flex items-center gap-4 flex-shrink-0">
          {contextTokenPayload && authService.hasAnyRoles(["ROLE_ADMIN"]) && (
            <Link
              to="/admin"
              className="flex items-center p-1.5 rounded-md transition-colors duration-[150ms] hover:bg-neutral-100"
            >
              <img src={AdminIcon} alt="Admin" className="w-[22px] h-[22px] sm:w-[18px] sm:h-[18px]" />
            </Link>
          )}
          <Link
            to="/cart"
            className="flex items-center p-1.5 rounded-md transition-colors duration-[150ms] hover:bg-neutral-100"
          >
            <CartIcon />
          </Link>
          <LoggedUser />
        </nav>
      </div>

      {/* Row 2: search bar — mobile only */}
      <div className="sm:hidden pb-3">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-neutral-50 border-[1.5px] border-neutral-200 rounded-full overflow-hidden transition-[border-color,box-shadow,background] duration-[150ms] focus-within:border-primary-400 focus-within:shadow-[0_0_0_3px_var(--color-primary-100)] focus-within:bg-white"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Buscar produtos..."
            className="flex-1 py-2 px-3 text-sm text-neutral-800 bg-transparent border-none outline-none min-w-0 placeholder:text-neutral-400"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="flex items-center justify-center px-3.5 py-2 bg-transparent border-none text-neutral-400 cursor-pointer flex-shrink-0 transition-colors duration-[150ms] hover:text-primary-600"
          >
            <Search size={16} />
          </button>
        </form>
      </div>
    </header>
  );
};

export { HeaderClient };
