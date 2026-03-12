import { useState, useCallback } from "react";
import { ContextToast, ToastItem, ToastType } from "../../utils/context-toast";
import { cn } from "../../lib/cn";

const bgMap: Record<ToastType, string> = {
  success: "bg-success-50 border-success-200",
  error:   "bg-danger-50 border-danger-200",
  info:    "bg-primary-50 border-primary-200",
};

const dotMap: Record<ToastType, string> = {
  success: "bg-success-600",
  error:   "bg-danger-600",
  info:    "bg-primary-600",
};

const barMap: Record<ToastType, string> = {
  success: "bg-success-500",
  error:   "bg-danger-500",
  info:    "bg-primary-500",
};

let nextId = 0;

type Props = { children: React.ReactNode };

const ToastProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ContextToast.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2.5 z-[9999] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "min-w-[260px] max-w-[340px] border rounded-md shadow-md overflow-hidden pointer-events-auto",
              bgMap[toast.type]
            )}
            style={{ animation: "toast-in 300ms ease forwards" }}
          >
            <div className="flex items-center gap-2.5 px-4 py-3">
              <span
                className={cn("w-2 h-2 flex-shrink-0 rounded-full", dotMap[toast.type])}
              />
              <span className="text-sm text-neutral-800 flex-1 leading-normal">
                {toast.message}
              </span>
            </div>
            <div
              className={cn("h-[3px]", barMap[toast.type])}
              style={{ animation: "progress-shrink 3000ms linear forwards" }}
            />
          </div>
        ))}
      </div>
    </ContextToast.Provider>
  );
};

export { ToastProvider };
