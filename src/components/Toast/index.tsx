import { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { tokens } from "../../styles/tokens";
import { ContextToast, ToastItem, ToastType } from "../../utils/context-toast";

const toastIn = keyframes`
  from { opacity: 0; transform: translateX(110%); }
  to   { opacity: 1; transform: translateX(0); }
`;

const progressShrink = keyframes`
  from { width: 100%; }
  to   { width: 0%; }
`;

const ToastsContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
  pointer-events: none;
`;

type ColorConfig = {
  bg: string;
  border: string;
  icon: string;
  bar: string;
};

const colorMap: Record<ToastType, ColorConfig> = {
  success: {
    bg:     tokens.colors.success[50],
    border: tokens.colors.success[200],
    icon:   tokens.colors.success[600],
    bar:    tokens.colors.success[500],
  },
  error: {
    bg:     tokens.colors.danger[50],
    border: tokens.colors.danger[200],
    icon:   tokens.colors.danger[600],
    bar:    tokens.colors.danger[500],
  },
  info: {
    bg:     tokens.colors.primary[50],
    border: tokens.colors.primary[200],
    icon:   tokens.colors.primary[600],
    bar:    tokens.colors.primary[500],
  },
};

const ToastBox = styled.div<{ $type: ToastType }>`
  min-width: 260px;
  max-width: 340px;
  background: ${({ $type }) => colorMap[$type].bg};
  border: 1px solid ${({ $type }) => colorMap[$type].border};
  border-radius: ${tokens.radius.md};
  box-shadow: ${tokens.shadow.md};
  overflow: hidden;
  animation: ${toastIn} 300ms ease forwards;
  pointer-events: auto;
`;

const ToastBody = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
`;

const IconDot = styled.span<{ $type: ToastType }>`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: ${tokens.radius.full};
  background: ${({ $type }) => colorMap[$type].icon};
`;

const ToastMessage = styled.span`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[800]};
  flex: 1;
  line-height: ${tokens.lineHeight.normal};
`;

const ProgressBar = styled.div<{ $type: ToastType }>`
  height: 3px;
  background: ${({ $type }) => colorMap[$type].bar};
  animation: ${progressShrink} 3000ms linear forwards;
`;

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
      <ToastsContainer>
        {toasts.map((toast) => (
          <ToastBox key={toast.id} $type={toast.type}>
            <ToastBody>
              <IconDot $type={toast.type} />
              <ToastMessage>{toast.message}</ToastMessage>
            </ToastBody>
            <ProgressBar $type={toast.type} />
          </ToastBox>
        ))}
      </ToastsContainer>
    </ContextToast.Provider>
  );
};

export { ToastProvider };
