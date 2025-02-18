export const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "40px",
    border: "1px solid #D9D9D9",
    boxShadow: "none",
    "&:hover": {
      border: "none",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#D9D9D9",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "#333",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};
