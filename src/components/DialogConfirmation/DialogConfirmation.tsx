import styled, { keyframes } from "styled-components";
import { AlertTriangle } from "lucide-react";
import { CtaButton } from "../CtaButton";
import { tokens } from "../../styles/tokens.ts";

/* ── Animations ──────────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

/* ── Overlay ─────────────────────────────────────────────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  animation: ${fadeIn} 200ms ease;
`;

/* ── Modal ───────────────────────────────────────────────── */
const ModalBox = styled.div`
  background: #ffffff;
  border-radius: ${tokens.radius.xl};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 32px;
  width: 90%;
  max-width: 440px;
  position: relative;
  animation: ${slideUp} 250ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.danger[100]};
  color: ${tokens.colors.danger[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 22px;
`;

const ModalTitle = styled.h2`
  font-size: ${tokens.fontSize.lg};
  font-weight: ${tokens.fontWeight.semibold};
  color: ${tokens.colors.neutral[900]};
  text-align: center;
  margin: 0 0 8px;
`;

const ModalMessage = styled.p`
  font-size: ${tokens.fontSize.sm};
  color: ${tokens.colors.neutral[600]};
  text-align: center;
  line-height: 1.6;
  margin: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

/* ── Types ───────────────────────────────────────────────── */
type Props = {
  message: string;
  onDialogAnswer: (answer: boolean, id: number) => void;
  id: number;
};

/* ── Component ───────────────────────────────────────────── */
const DialogConfirmation = ({ id, message, onDialogAnswer }: Props) => {
  return (
    <Overlay onClick={() => onDialogAnswer(false, id)}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <IconCircle><AlertTriangle size={22} /></IconCircle>
        <ModalTitle>Confirmar ação</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonRow>
          <CtaButton
            variant="secondary"
            fullWidth
            onClick={() => onDialogAnswer(false, id)}
          >
            Cancelar
          </CtaButton>
          <CtaButton
            variant="danger"
            fullWidth
            onClick={() => onDialogAnswer(true, id)}
          >
            Confirmar
          </CtaButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export { DialogConfirmation };
