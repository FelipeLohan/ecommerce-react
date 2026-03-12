import { cn } from "../../lib/cn";

const FormTextArea = (props: any) => {
  const { validation, invalid = "false", className, ...inputProps } = props;

  return (
    <textarea
      className={cn(
        "form-control w-full min-h-[150px] px-4 py-3 text-sm text-neutral-800 bg-white",
        "border-[1.5px] border-neutral-300 rounded-md resize-y",
        "placeholder:text-neutral-400",
        "hover:border-neutral-400",
        "focus:border-primary-500 focus:shadow-[0_0_0_3px_var(--color-primary-100)] focus:outline-none",
        "disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed",
        "transition-[border-color,box-shadow] duration-[150ms]",
        className
      )}
      data-invalid={invalid}
      {...inputProps}
    />
  );
};

export { FormTextArea };
