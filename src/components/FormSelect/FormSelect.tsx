import Select from "react-select";
import { selectStyles } from "../../utils/select-style";
import { cn } from "../../lib/cn";

const FormSelect = (props: any) => {
  const { validation, className, invalid = "false", ...selectProps } = props;

  return (
    <div data-invalid={invalid} className={cn("w-full", className)}>
      <Select styles={selectStyles} {...selectProps} />
    </div>
  );
};

export { FormSelect };
