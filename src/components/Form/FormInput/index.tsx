import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: any;
  wrapperClass?: string;
  className?: string;
}

const FormInput: FC<InputProps> = ({
  register,
  name,
  error,
  label,
  wrapperClass,
  className,
  ...rest
}) => {

  return (
    <div className={`${wrapperClass} flex flex-col`}>
      {label && <label htmlFor={name} className="text-sm font-bold">{label}</label>}
      <input
        aria-invalid={error ? "true" : "false"}
        {...register(name)}
        {...rest}
        className={`${className} w-full rounded py-1 px-2`}
      />
      <small className="h-5 overflow-hidden whitespace-nowrap text-overflow-ellipsis block self-end text-red">
        {error}
      </small>
    </div>
  );
};

export default FormInput;
