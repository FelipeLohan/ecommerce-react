import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white border-2 border-primary-600 hover:not-disabled:bg-primary-700 hover:not-disabled:border-primary-700",
  secondary:
    "bg-transparent text-primary-600 border-2 border-primary-600 hover:not-disabled:bg-primary-50",
  danger:
    "bg-danger-600 text-white border-2 border-danger-600 hover:not-disabled:bg-danger-700 hover:not-disabled:border-danger-700",
  ghost:
    "bg-transparent text-primary-600 border-2 border-transparent hover:not-disabled:bg-primary-50 hover:not-disabled:border-primary-100",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Spinner = () => (
  <span
    className="inline-block w-[18px] h-[18px] rounded-full border-2 border-white/35 border-t-white"
    style={{ animation: "btn-spin 600ms linear infinite" }}
  />
);

const CtaButton = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  children,
  type = "button",
}: Props) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center rounded-lg font-medium cursor-pointer",
      "transition-[background-color,border-color,box-shadow,transform] duration-[250ms]",
      "hover:not-disabled:-translate-y-px hover:not-disabled:shadow-md",
      "active:not-disabled:translate-y-0 active:not-disabled:shadow-sm",
      "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full"
    )}
  >
    {isLoading ? <Spinner /> : children}
  </button>
);

export { CtaButton };
