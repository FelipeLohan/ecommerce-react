import { X, Info } from "lucide-react";
import { CtaButton } from "../CtaButton";

type Props = {
  message: string;
  onDialogClose: () => void;
};

const DialogInfo = ({ message, onDialogClose }: Props) => {
  return (
    <div
      className="fixed inset-0 bg-[rgba(15,23,42,0.4)] backdrop-blur-[4px] flex items-center justify-center z-[200]"
      style={{ animation: "fade-in 200ms ease" }}
      onClick={onDialogClose}
    >
      <div
        className="bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-8 w-[90%] max-w-[440px] relative"
        style={{ animation: "slide-up 250ms cubic-bezier(0.16,1,0.3,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onDialogClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 bg-transparent border-none text-neutral-400 cursor-pointer p-1 flex items-center leading-none transition-colors duration-[150ms] hover:text-neutral-700"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
          <Info size={22} />
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 text-center m-0 mb-2">
          Informação
        </h2>
        <p className="text-sm text-neutral-600 text-center leading-[1.6] m-0 mb-6">
          {message}
        </p>

        <CtaButton variant="primary" fullWidth onClick={onDialogClose}>
          Ok, entendi
        </CtaButton>
      </div>
    </div>
  );
};

export { DialogInfo };
