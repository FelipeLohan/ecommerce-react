import { cn } from "../../lib/cn";

type Props = {
  id: number;
  name: string;
  isFeatured?: boolean;
  onDeleteClick: () => void;
  onUpdateClick: () => void;
};

/* Renders <td> cells — must be used inside <tr> */
const CategoryAdminListCard = ({ id, name, isFeatured, onDeleteClick, onUpdateClick }: Props) => {
  const td = "px-4 py-3.5 text-sm text-neutral-700 border-b border-neutral-50";
  const actionBtn = (danger?: boolean) =>
    cn(
      "w-8 h-8 flex items-center justify-center bg-transparent border-none rounded-md text-neutral-500 cursor-pointer",
      "transition-[color,background] duration-[150ms] hover:bg-neutral-100",
      danger ? "hover:text-danger-600" : "hover:text-primary-600"
    );

  return (
    <>
      <td className={cn(td, "text-neutral-400 text-xs")}>#{id}</td>
      <td className={cn(td, "max-w-[300px]")}>{name}</td>
      <td className={td}>
        {isFeatured ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700">
            Em destaque
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-500">
            Padrão
          </span>
        )}
      </td>
      <td className={td}>
        <div className="flex gap-2">
          <button className={actionBtn()} onClick={onUpdateClick} aria-label="Editar" title="Editar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className={actionBtn(true)} onClick={onDeleteClick} aria-label="Excluir" title="Excluir">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </td>
    </>
  );
};

export { CategoryAdminListCard };
