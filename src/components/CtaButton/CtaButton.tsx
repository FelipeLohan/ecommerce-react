import styled, { css } from "styled-components";
import { tokens } from "../../styles/tokens.ts";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${tokens.colors.primary[600]};
    color: #ffffff;
    border: 2px solid ${tokens.colors.primary[600]};
    &:hover:not(:disabled) {
      background-color: ${tokens.colors.primary[700]};
      border-color: ${tokens.colors.primary[700]};
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${tokens.colors.primary[600]};
    border: 2px solid ${tokens.colors.primary[600]};
    &:hover:not(:disabled) {
      background-color: ${tokens.colors.primary[50]};
    }
  `,
  danger: css`
    background-color: ${tokens.colors.danger[600]};
    color: #ffffff;
    border: 2px solid ${tokens.colors.danger[600]};
    &:hover:not(:disabled) {
      background-color: ${tokens.colors.danger[700]};
      border-color: ${tokens.colors.danger[700]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${tokens.colors.primary[600]};
    border: 2px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${tokens.colors.primary[50]};
      border-color: ${tokens.colors.primary[100]};
    }
  `,
};

const sizeStyles: Record<Size, ReturnType<typeof css>> = {
  sm: css`
    padding: 8px 16px;
    font-size: ${tokens.fontSize.xs};
  `,
  md: css`
    padding: 10px 24px;
    font-size: ${tokens.fontSize.sm};
  `,
  lg: css`
    padding: 14px 32px;
    font-size: ${tokens.fontSize.base};
  `,
};

const StyledButton = styled.button<{ $variant: Variant; $size: Size; $fullWidth: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.radius.lg};
  font-weight: ${tokens.fontWeight.medium};
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  transition:
    background-color ${tokens.transition.base},
    border-color ${tokens.transition.base},
    box-shadow ${tokens.transition.base},
    transform ${tokens.transition.fast};

  &:hover:not(:disabled) {
    box-shadow: ${tokens.shadow.md};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${tokens.shadow.sm};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.primary[500]};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;

const CtaButton = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  type = "button",
}: Props) => (
  <StyledButton
    $variant={variant}
    $size={size}
    $fullWidth={fullWidth}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </StyledButton>
);

export { CtaButton };
