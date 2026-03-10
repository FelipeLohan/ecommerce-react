export const tokens = {
  colors: {
    primary: {
      50:  "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
      950: "#172554",
    },
    success: {
      50:  "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      500: "#22C55E",
      600: "#16A34A",
      700: "#15803D",
      900: "#14532D",
    },
    accent: {
      50:  "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
    },
    danger: {
      50:  "#FEF2F2",
      100: "#FEE2E2",
      200: "#FECACA",
      500: "#EF4444",
      600: "#DC2626",
      700: "#B91C1C",
    },
    neutral: {
      0:   "#FFFFFF",
      50:  "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
      950: "#020617",
    },
    surface: {
      page:  "#F1F5F9",
      card:  "#FFFFFF",
      overlay: "rgba(15, 23, 42, 0.4)",
    },
  },

  fontSize: {
    xs:   "12px",
    sm:   "14px",
    base: "16px",
    lg:   "18px",
    xl:   "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
  },

  fontWeight: {
    normal:   "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
  },

  lineHeight: {
    tight:   "1.1",
    snug:    "1.2",
    normal:  "1.5",
    relaxed: "1.7",
  },

  spacing: {
    1:  "4px",
    2:  "8px",
    3:  "12px",
    4:  "16px",
    5:  "20px",
    6:  "24px",
    8:  "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
  },

  radius: {
    sm:   "6px",
    md:   "10px",
    lg:   "16px",
    xl:   "20px",
    full: "9999px",
  },

  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
    lg: "0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)",
    xl: "0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)",
  },

  transition: {
    fast: "150ms ease",
    base: "250ms ease",
    slow: "400ms ease",
  },

  breakpoint: {
    sm:  "480px",
    md:  "768px",
    lg:  "1024px",
    xl:  "1280px",
  },
} as const;

export type Tokens = typeof tokens;
