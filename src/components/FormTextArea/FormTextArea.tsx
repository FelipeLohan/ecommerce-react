const FormTextArea = (props: any) => {
  const {
    validation,
    invalid = "false",
    ...inputProps
  } = props;


  return (
    <>
      <textarea
        {...inputProps}
        data-invalid={invalid}
      />
    </>
  );
};

export { FormTextArea };
