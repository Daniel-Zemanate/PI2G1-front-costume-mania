import React, { useState, useEffect } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

interface StepInputProps {
  setState: (value: number) => void;
  min: number;
  max: number;
}

const StepInput: React.FC<StepInputProps> = ({ setState, min, max }) => {
  const [value, setValue] = useState(min);

  useEffect(() => {
    if (max < value) {
      setValue(min);
      setState(min);
    }
  }, [max, min, setState, value]);

  const handleIncrement = () => {
    const incrementedValue = value + 1 <= max ? value + 1 : value;
    setValue(incrementedValue);
    setState(incrementedValue);
  };

  const handleDecrement = () => {
    const decrementedValue = value - 1 >= min ? value - 1 : value;
    setValue(decrementedValue);
    setState(decrementedValue);
  };

  return (
    <div className="flex flex-col items-center text-xl">
      <button onClick={handleIncrement}>
        <RiArrowUpSLine />
      </button>
      <span className="text-2xl">{value}</span>
      <button onClick={handleDecrement}>
        <RiArrowDownSLine />
      </button>
    </div>
  );
};

export default StepInput;
