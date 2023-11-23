import React, { FC, InputHTMLAttributes } from "react";

export interface SelectOption {
    value: string;
    label: string
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: SelectOption[];
    label?: string;
    error?: string;
    register?: any;
    wrapperClass?: string;
    className?: string;
}

const FormSelect: FC<SelectProps> = ({
    register,
    name,
    options,
    error,
    label,
    wrapperClass,
    className,
    ...rest
}) => {

    return (
        <div className={`${wrapperClass} flex flex-col`}>
            {label && <label htmlFor={name} className="text-sm font-bold">{label}</label>}
            <select
                aria-invalid={error ? "true" : "false"}
                {...register(name)}
                {...rest}
                className={`${className} w-full rounded py-1 px-2`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <small className="h-5 overflow-hidden whitespace-nowrap text-overflow-ellipsis block self-end text-red">
                {error}
            </small>
        </div>
    );
};

export default FormSelect;
