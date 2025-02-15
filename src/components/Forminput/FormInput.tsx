const FormInput = (props: any) => {
  const {
    validation,
    invalid = "false",
    ...inputProps
  } = props;


  return (
    <>
      <input
        {...inputProps}
        data-invalid={invalid}
      />
    </>
  );
};

export { FormInput };
