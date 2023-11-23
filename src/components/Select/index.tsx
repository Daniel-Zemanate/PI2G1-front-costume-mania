import { KeyValue } from "@/interfaces/costume";
import { Listbox } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { RiExpandUpDownLine, RiCheckLine } from "react-icons/ri";

type FilterCallback = (param: string, value: any) => void;
type ChangeCallback = (param: string) => void;

function Select({
  label,
  options,
  onChange,
  filter,
  className,
  defaultValue,
}: {
  label: string;
  options: { key: string; value: string }[];
  onChange: FilterCallback | ChangeCallback;
  filter?: boolean;
  className?: string;
  defaultValue?: KeyValue;
}) {
  const searchParams = useSearchParams();
  
  const selectOptions = useMemo(() => {
    const allOption = { key: "", value: "All" };
    const processedOptions = filter ? [allOption, ...options] : options;
    return processedOptions;
  }, [options, filter]);

  const [value, setValue] = useState<KeyValue>(defaultValue || selectOptions[0]);

  const handleChange = (newValue: KeyValue) => {
    setValue(newValue);

    if (onChange.length === 2) {
      (onChange as FilterCallback)(label.toLowerCase(), newValue.key);
    } else {
      (onChange as ChangeCallback)(newValue.key);
    }
  };

  useEffect(() => {
    if (filter) {
      const param = searchParams.get(label.toLowerCase());
      if (param) {
        const paramOption = selectOptions.find((e) => e.key === param);
        setValue(paramOption || selectOptions[0]);
      } else {
        setValue(selectOptions[0]);
      }
    }
  }, [filter, searchParams, selectOptions, label]);

  return (
    <div className={`flex flex-col ${className || ""}`}>
      <small>{label}</small>
      <Listbox value={value} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="flex w-full justify-between items-center font-bold rounded-lg p-2 bg-purple-3 bg-opacity-50">
            <span className="block truncate">{value.value}</span>
            <span>
              <RiExpandUpDownLine
                className="h-5 w-5 text-red"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-0.5 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
            {selectOptions.map((option, idx) => (
              <Listbox.Option
                key={`${idx}`}
                value={option}
                className="cursor-pointer hover:bg-orange-2 hover:bg-opacity-20"
              >
                {({ selected }) => (
                  <span className="flex justify-between mx-3">
                    <span
                      className={`block truncate ${
                        selected ? "font-bold" : "font-normal"
                      }`}
                    >
                      {option.value}
                    </span>
                    {selected ? (
                      <span className="inset-y-0 left-0 flex items-center pl-3 text-orange-2">
                        <RiCheckLine className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default Select;
