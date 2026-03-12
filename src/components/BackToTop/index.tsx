import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      className={cn(
        "fixed bottom-20 right-6 z-[90] w-11 h-11 rounded-full",
        "bg-primary-600 text-white border-none",
        "flex items-center justify-center shadow-md",
        "transition-[opacity,transform] duration-[250ms]",
        "hover:bg-primary-700",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};

export { BackToTop };
