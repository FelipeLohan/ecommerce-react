import { StylesConfig } from "react-select";
import { tokens } from "../styles/tokens.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectStyles: StylesConfig<any, any> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "44px",
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.neutral[800],
    background: "#ffffff",
    border: `1.5px solid ${state.isFocused ? tokens.colors.primary[500] : tokens.colors.neutral[300]}`,
    borderRadius: tokens.radius.md,
    boxShadow: state.isFocused ? `0 0 0 3px ${tokens.colors.primary[100]}` : "none",
    transition: `border-color ${tokens.transition.fast}, box-shadow ${tokens.transition.fast}`,
    "&:hover": {
      borderColor: state.isFocused ? tokens.colors.primary[500] : tokens.colors.neutral[400],
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: tokens.colors.neutral[400],
    fontSize: tokens.fontSize.sm,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.neutral[800],
    backgroundColor: state.isSelected
      ? tokens.colors.primary[600]
      : state.isFocused
      ? tokens.colors.primary[50]
      : "#ffffff",
    "&:active": {
      backgroundColor: tokens.colors.primary[100],
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: tokens.colors.neutral[800],
    fontSize: tokens.fontSize.sm,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: tokens.radius.md,
    boxShadow: tokens.shadow.lg,
    border: `1px solid ${tokens.colors.neutral[200]}`,
    overflow: "hidden",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: tokens.colors.neutral[400],
    "&:hover": {
      color: tokens.colors.neutral[600],
    },
  }),
};
