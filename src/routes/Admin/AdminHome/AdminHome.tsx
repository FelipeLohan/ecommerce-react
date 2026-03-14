import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, LayoutList, Tags } from "lucide-react";
import { UserDTO } from "../../../models/user";
import * as userService from "../../../services/user-service.ts";

const AdminHome = () => {
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe().then((response) => setUser(response.data));
  }, []);

  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <main className="max-w-[1100px] mx-auto px-6">
      <div
        className="rounded-lg p-10 text-white mb-8"
        style={{ background: "linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))" }}
      >
        <h1 className="text-3xl font-bold leading-snug m-0 mb-2">
          {firstName ? `Olá, ${firstName}! 👋` : "Bem-vindo ao painel!"}
        </h1>
        <p className="text-base m-0" style={{ color: "rgba(255,255,255,0.75)" }}>
          Gerencie seus produtos, categorias e pedidos pelo menu de navegação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Link
          to="/admin/products/create"
          className="flex items-center gap-4 p-5 bg-white border border-neutral-200 rounded-lg shadow-sm no-underline transition-[box-shadow,border-color] duration-150 hover:shadow-md hover:border-primary-300 group"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 transition-colors duration-150 group-hover:bg-primary-100">
            <PlusCircle size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800 m-0">Novo produto</p>
            <p className="text-xs text-neutral-400 m-0 mt-0.5">Cadastrar um novo produto</p>
          </div>
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center gap-4 p-5 bg-white border border-neutral-200 rounded-lg shadow-sm no-underline transition-[box-shadow,border-color] duration-150 hover:shadow-md hover:border-primary-300 group"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 transition-colors duration-150 group-hover:bg-primary-100">
            <LayoutList size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800 m-0">Gerenciar produtos</p>
            <p className="text-xs text-neutral-400 m-0 mt-0.5">Ver e editar produtos cadastrados</p>
          </div>
        </Link>

        <Link
          to="/admin/categories"
          className="flex items-center gap-4 p-5 bg-white border border-neutral-200 rounded-lg shadow-sm no-underline transition-[box-shadow,border-color] duration-150 hover:shadow-md hover:border-primary-300 group"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 transition-colors duration-150 group-hover:bg-primary-100">
            <Tags size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800 m-0">Gerenciar categorias</p>
            <p className="text-xs text-neutral-400 m-0 mt-0.5">Ver, criar e editar categorias</p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export { AdminHome };
