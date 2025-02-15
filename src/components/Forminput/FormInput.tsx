
const FormInput = (props: any) => {

  const { validation , invalid,  ...inputProps} = props

  return(
    <>
    <input {...inputProps} data-invalid={invalid} />
    </>
  )
}

export { FormInput };