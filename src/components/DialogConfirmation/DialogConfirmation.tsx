import { AlertTriangle } from "lucide-react";
import { CtaButton } from "../CtaButton";

type Props = {
  message: string;
  onDialogAnswer: (answer: boolean, id: number) => void;
  id: number;
};

const DialogConfirmation = ({ id, message, onDialogAnswer }: Props) => {
  return (
    <div
      className="fixed inset-0 bg-[rgba(15,23,42,0.4)] backdrop-blur-[4px] flex items-center justify-center z-[200]"
      style={{ animation: "fade-in 200ms ease" }}
      onClick={() => onDialogAnswer(false, id)}
    >
      <div
        className="bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-8 w-[90%] max-w-[440px] relative"
        style={{ animation: "slide-up 250ms cubic-bezier(0.16,1,0.3,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-danger-100 text-danger-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={22} />
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 text-center m-0 mb-2">
          Confirmar ação
        </h2>
        <p className="text-sm text-neutral-600 text-center leading-[1.6] m-0">
          {message}
        </p>

        <div className="flex gap-3 mt-6">
          <CtaButton variant="secondary" fullWidth onClick={() => onDialogAnswer(false, id)}>
            Cancelar
          </CtaButton>
          <CtaButton variant="danger" fullWidth onClick={() => onDialogAnswer(true, id)}>
            Confirmar
          </CtaButton>
        </div>
      </div>
    </div>
  );
};

export { DialogConfirmation };
