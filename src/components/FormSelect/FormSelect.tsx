import Select from "react-select";

const FormSelect = (props: any) => {
  const {
    validation,
    invalid = "false",
    ...selectProps
  } = props;


  return (
    <>
      <Select
        {...selectProps}
        data-invalid={invalid}
      />
    </>
  );
};

export { FormSelect };
