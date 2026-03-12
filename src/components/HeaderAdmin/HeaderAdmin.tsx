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

          <LoggedUser />
        </nav>
      </div>
    </header>
  );
};

export { HeaderAdmin };
