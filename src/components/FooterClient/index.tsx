import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

export function FooterClient() {
  const year = new Date().getFullYear();

  const footerLink = "text-sm text-neutral-400 no-underline transition-colors duration-[150ms] hover:text-white";
  const socialLink = "flex items-center gap-2 text-sm text-neutral-400 no-underline transition-colors duration-[150ms] hover:text-white";
  const colTitle = "text-xs font-semibold text-neutral-300 uppercase tracking-[0.08em] m-0 mb-4";

  return (
    <footer className="bg-neutral-800 px-10 py-12 max-[600px]:px-6 max-[600px]:py-10">
      <div className="max-w-[1200px] mx-auto">

        {/* Grid 3 colunas */}
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-12 max-[600px]:grid-cols-1 max-[600px]:gap-8">

          {/* Col 1 — Brand */}
          <div>
            <img
              src="/Brand_White.svg"
              alt="Ecommerce"
              className="h-8 w-auto block mb-2"
            />
            <p className="text-sm text-neutral-400 leading-relaxed m-0 mb-5">
              Projeto de portfólio desenvolvido com React, TypeScript e Spring Boot.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/FelipeLohan/ecommerce-react"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLink}
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/felipe-lohan-767294213/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialLink}
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Col 2 — Navegação */}
          <div>
            <h4 className={colTitle}>Navegação</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              <li><Link to="/catalog" className={footerLink}>Catálogo</Link></li>
              <li><Link to="/cart" className={footerLink}>Carrinho</Link></li>
            </ul>
          </div>

          {/* Col 3 — Conta */}
          <div>
            <h4 className={colTitle}>Conta</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
              <li><Link to="/my-account" className={footerLink}>Minha Conta</Link></li>
              <li><Link to="/login" className={footerLink}>Login</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-none border-t border-neutral-700 my-8" />

        <p className="text-center text-xs text-neutral-500 m-0">
          © {year} Felipe Lohan. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
