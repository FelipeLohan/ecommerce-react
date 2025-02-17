import Select from "react-select";

const FormSelect = (props: any) => {
  const { validation, className, invalid = "false", ...selectProps } = props;

  return (
    <>
      <div data-invalid={invalid} className={className} >
        <Select {...selectProps} />
      </div>
    </>
  );
};

export { FormSelect };
