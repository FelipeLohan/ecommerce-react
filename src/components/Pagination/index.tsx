import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

type Props = {
  currentPage: number;   // 0-based
  totalPages: number;
  onChange: (page: number) => void;
};

const MAX_VISIBLE = 5;

export function Pagination({ currentPage, totalPages, onChange }: Props) {
  // Build the window of page numbers to display
  function getPages(): (number | "...")[] {
    if (totalPages <= MAX_VISIBLE + 2) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages: (number | "...")[] = [0];

    const start = Math.max(1, currentPage - 1);
    const end   = Math.min(totalPages - 2, currentPage + 1);

    if (start > 1) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 2) pages.push("...");

    pages.push(totalPages - 1);
    return pages;
  }

  const btnBase =
    "flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-[background,color,border-color] duration-150 border border-transparent cursor-pointer select-none";

  return (
    <div className="flex items-center justify-center gap-1 mt-8 mb-10">
      {/* Prev */}
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 0}
        aria-label="Página anterior"
        className={cn(
          btnBase,
          currentPage === 0
            ? "text-neutral-300 cursor-not-allowed"
            : "text-neutral-600 hover:bg-neutral-100"
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-neutral-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            aria-current={p === currentPage ? "page" : undefined}
            className={cn(
              btnBase,
              p === currentPage
                ? "bg-primary-500 text-white border-primary-500 hover:bg-primary-600"
                : "text-neutral-600 hover:bg-neutral-100 border-neutral-200"
            )}
          >
            {(p as number) + 1}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        aria-label="Próxima página"
        className={cn(
          btnBase,
          currentPage >= totalPages - 1
            ? "text-neutral-300 cursor-not-allowed"
            : "text-neutral-600 hover:bg-neutral-100"
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
