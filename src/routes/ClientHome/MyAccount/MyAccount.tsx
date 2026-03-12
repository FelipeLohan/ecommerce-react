import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Hash, ArrowLeft } from "lucide-react";
import * as userService from "../../../services/user-service.ts";
import { UserDTO } from "../../../models/user.ts";

const MyAccount = () => {
  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe().then((res) => setUser(res.data));
  }, []);

  const initial = user?.name?.charAt(0) ?? "U";

  return (
    <div className="min-h-screen bg-surface-page px-4 pt-12 pb-16 flex flex-col items-center">
      {/* Card */}
      <div
        className="w-full max-w-[480px] bg-white rounded-xl shadow-lg overflow-hidden"
        style={{ animation: "fade-up 0.4s ease both" }}
      >
        {/* Header */}
        <div
          className="px-8 pt-10 pb-8 flex flex-col items-center gap-3"
          style={{ background: "linear-gradient(135deg, var(--color-primary-600), var(--color-primary-900))" }}
        >
          <div className="w-18 h-18 rounded-full flex items-center justify-center text-2xl font-bold text-white uppercase"
            style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.4)", width: 72, height: 72 }}>
            {user ? initial : (
              <div
                className="w-8 h-8 rounded-md bg-neutral-200"
                style={{ animation: "pulse 1.4s ease infinite" }}
              />
            )}
          </div>
          {user ? (
            <h1 className="text-xl font-bold text-white m-0 text-center">{user.name}</h1>
          ) : (
            <div
              className="w-[140px] h-[22px] rounded-md bg-neutral-200"
              style={{ animation: "pulse 1.4s ease infinite" }}
            />
          )}
        </div>

        {/* Info list */}
        <div className="py-2">
          <div className="flex items-center gap-3.5 px-7 py-4 border-b border-neutral-100">
            <div className="w-9 h-9 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <Mail size={17} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.05em]">E-mail</span>
              {user ? (
                <span className="text-sm font-medium text-neutral-800">{user.email}</span>
              ) : (
                <div
                  className="w-[180px] h-4 rounded-md bg-neutral-200"
                  style={{ animation: "pulse 1.4s ease infinite" }}
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-7 py-4">
            <div className="w-9 h-9 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <Hash size={17} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.05em]">ID da conta</span>
              {user ? (
                <span className="text-sm font-medium text-neutral-800">#{user.id}</span>
              ) : (
                <div
                  className="w-[60px] h-4 rounded-md bg-neutral-200"
                  style={{ animation: "pulse 1.4s ease infinite" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div
        className="mt-6 w-full max-w-[480px]"
        style={{ animation: "fade-up 0.4s 0.1s ease both" }}
      >
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 no-underline transition-colors duration-150 hover:text-primary-600"
        >
          <ArrowLeft size={15} /> Voltar ao catálogo
        </Link>
      </div>
    </div>
  );
};

export { MyAccount };
