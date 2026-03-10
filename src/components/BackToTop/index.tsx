import { useEffect, useState } from "react";
import styled from "styled-components";
import { tokens } from "../../styles/tokens";

const Btn = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: ${tokens.radius.full};
  background: ${tokens.colors.primary[600]};
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${tokens.shadow.md};
  z-index: 90;
  opacity: ${({ $visible }) => ($visible ? "1" : "0")};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "16px")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition:
    opacity ${tokens.transition.base},
    transform ${tokens.transition.base},
    background-color ${tokens.transition.fast};

  &:hover {
    background: ${tokens.colors.primary[700]};
  }
`;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Btn
      $visible={visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
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
    </Btn>
  );
};

export { BackToTop };
