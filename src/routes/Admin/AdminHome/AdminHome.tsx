import { useEffect, useState } from "react";
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
    </main>
  );
};

export { AdminHome };
