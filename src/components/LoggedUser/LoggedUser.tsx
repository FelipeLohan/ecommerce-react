import * as authService from "../../services/auth-service.ts";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { ContextToken } from "../../utils/context-token.ts";
import { User, LogOut } from "lucide-react";
import { cn } from "../../lib/cn.ts";

const LoggedUser = () => {
  const { contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {
    authService.logout();
    setContextTokenPayload(undefined);
    setIsOpen(false);
  }

  function handleMyAccount() {
    setIsOpen(false);
    navigate("/my-account");
  }

  if (contextTokenPayload && authService.isAuthenticated()) {
    const initial = contextTokenPayload.user_name?.charAt(0) ?? "U";

    return (
      <div ref={wrapperRef} className="relative">
        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          title={contextTokenPayload.user_name}
          className="w-[34px] h-[34px] rounded-full bg-primary-100 text-primary-700 font-semibold text-sm border-none cursor-pointer flex items-center justify-center uppercase leading-none transition-[background-color,color] duration-[150ms] hover:bg-primary-200 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        >
          {initial}
        </button>

        {isOpen && (
          <div
            role="menu"
            className="absolute top-[calc(100%+10px)] right-0 min-w-[200px] bg-white border border-neutral-100 rounded-lg shadow-xl overflow-hidden z-[200]"
            style={{ animation: "fade-slide-in 180ms ease" }}
          >
            <div className="px-4 py-3 bg-neutral-50">
              <span className="block text-sm font-semibold text-neutral-800 whitespace-nowrap overflow-hidden text-ellipsis">
                {contextTokenPayload.user_name}
              </span>
            </div>

            <div className="h-px bg-neutral-100" />

            <button
              role="menuitem"
              onClick={handleMyAccount}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-transparent border-none text-sm font-medium text-neutral-700 cursor-pointer text-left transition-[background-color,color] duration-[150ms] hover:bg-neutral-50 hover:text-neutral-900"
            >
              <User size={15} />
              Minha conta
            </button>

            <div className="h-px bg-neutral-100" />

            <button
              role="menuitem"
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-2.5 px-4 py-2.5 bg-transparent border-none text-sm font-medium cursor-pointer text-left",
                "text-danger-600 transition-[background-color,color] duration-[150ms] hover:bg-danger-50 hover:text-danger-700"
              )}
            >
              <LogOut size={15} />
              Sair
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="text-sm font-medium text-neutral-600 no-underline px-3 py-1.5 rounded-md border-[1.5px] border-neutral-300 transition-[border-color,color,background-color] duration-[150ms] hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50"
    >
      Entrar
    </Link>
  );
};

export { LoggedUser };
