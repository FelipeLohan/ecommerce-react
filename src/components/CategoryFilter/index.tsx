import { useEffect, useState } from "react";
import { CategoryDTO } from "../../models/category";
import * as categoryService from "../../services/category-service";
import { cn } from "../../lib/cn";

type Props = {
  selectedId: number;
  onChange: (id: number) => void;
};

export function CategoryFilter({ selectedId, onChange }: Props) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  const chipClass = (active: boolean) =>
    cn(
      "px-4 py-1.5 rounded-full border-[1.5px] text-sm cursor-pointer",
      "transition-[background,color,border-color] duration-[150ms]",
      active
        ? "bg-primary-500 border-primary-500 text-white font-semibold hover:bg-primary-600 hover:border-primary-600"
        : "bg-transparent border-neutral-300 text-neutral-600 font-normal hover:bg-primary-50 hover:border-primary-400 hover:text-primary-600"
    );

  return (
    <div className="flex flex-wrap gap-2 px-[5%]">
      <button className={chipClass(selectedId === 0)} onClick={() => onChange(0)}>
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={chipClass(selectedId === cat.id)}
          onClick={() => onChange(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
