import Select from "react-select";
import { selectStyles } from "../../utils/select-style";

const FormSelect = (props: any) => {
  const { validation, className, invalid = "false", ...selectProps } = props;

  return (
    <>
      <div data-invalid={invalid} className={className} >
        <Select
        styles={selectStyles} 
        {...selectProps} />
      </div>
    </>
  );
};

export { FormSelect };
