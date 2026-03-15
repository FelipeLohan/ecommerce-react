import HomeIcon from "../../assets/HomeIcon.svg";
import StockIcon from "../../assets/StockIcon.svg";
import { LoggedUser } from "../LoggedUser";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn.ts";

const HeaderAdmin = () => {
  const navItem = (isActive: boolean) =>
    cn(
      "flex items-center gap-2 text-sm font-medium no-underline pb-0.5 border-b-2 transition-[color,border-color] duration-[150ms]",
      isActive
        ? "text-white border-primary-400"
        : "text-neutral-400 border-transparent hover:text-white"
    );

  return (
    <header className="bg-neutral-900 mb-10">
      <div className="w-4/5 mx-auto h-[60px] flex items-center justify-between max-[800px]:w-[92%]">

        {/* Brand */}
        <div className="text-lg font-bold text-white tracking-[-0.01em]">
          Admin
          <span className="inline-block bg-primary-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold ml-2 align-middle">
            painel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex gap-8 items-center">
          <NavLink
            to="/admin/home"
            className={({ isActive }) => navItem(isActive)}
          >
            <img
              src={HomeIcon}
              alt=""
              className="w-5 h-5 opacity-60 transition-opacity duration-[150ms] [.active_&]:opacity-100 max-[600px]:w-[18px] max-[600px]:h-[18px] max-[420px]:w-4 max-[420px]:h-4"
            />
            <span className="max-[800px]:hidden">Início</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => navItem(isActive)}
          >
            <img
              src={StockIcon}
              alt=""
              className="w-5 h-5 opacity-60 transition-opacity duration-[150ms] [.active_&]:opacity-100 max-[600px]:w-[18px] max-[600px]:h-[18px] max-[420px]:w-4 max-[420px]:h-4"
            />
            <span className="max-[800px]:hidden">Produtos</span>
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) => navItem(isActive)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 transition-opacity duration-[150ms] [.active_&]:opacity-100 max-[600px]:w-[18px] max-[600px]:h-[18px] max-[420px]:w-4 max-[420px]:h-4"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span className="max-[800px]:hidden">Categorias</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => navItem(isActive)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 transition-opacity duration-[150ms] [.active_&]:opacity-100 max-[600px]:w-[18px] max-[600px]:h-[18px] max-[420px]:w-4 max-[420px]:h-4"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="max-[800px]:hidden">Pedidos</span>
          </NavLink>

          <LoggedUser />
        </nav>
      </div>
    </header>
  );
};

export { HeaderAdmin };
