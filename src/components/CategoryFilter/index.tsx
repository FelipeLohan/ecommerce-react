import { useEffect, useRef, useState } from "react";
import { CategoryDTO } from "../../models/category";
import * as categoryService from "../../services/category-service";
import { cn } from "../../lib/cn";
import { ChevronDown, Tag } from "lucide-react";

type Props = {
  selectedId: number;
  onChange: (id: number) => void;
};

export function CategoryFilter({ selectedId, onChange }: Props) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    selectedId === 0
      ? "Todas"
      : categories.find((c) => c.id === selectedId)?.name ?? "Todas";

  function handleSelect(id: number) {
    onChange(id);
    setOpen(false);
  }

  return (
    <div className="relative w-fit" ref={containerRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] text-sm font-medium cursor-pointer",
          "transition-[background,color,border-color,box-shadow] duration-[150ms]",
          open || selectedId !== 0
            ? "bg-primary-500 border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600"
            : "bg-transparent border-neutral-300 text-neutral-600 hover:bg-primary-50 hover:border-primary-400 hover:text-primary-600"
        )}
      >
        <Tag size={14} />
        <span>
          Categorias
          {selectedId !== 0 && (
            <span className="ml-1 opacity-80">· {selectedLabel}</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-[150ms]", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
          {[{ id: 0, name: "Todas" }, ...categories].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors duration-[100ms]",
                selectedId === cat.id
                  ? "bg-primary-50 text-primary-600 font-semibold"
                  : "text-neutral-700 hover:bg-neutral-50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
