import React, { useState, useEffect } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

interface StepInputProps {
  setState: (value: number) => void;
  state: number;
  min: number;
  max: number;
  inline?: boolean
}

const StepInput: React.FC<StepInputProps> = ({ setState, state, min, max, inline }) => {
  const [value, setValue] = useState(state || min);

  useEffect(() => {
    if (max < value) {
      setValue(min);
      setState(min);
    }
  }, [max, min, setState, value, state]);

  useEffect(() => {
    setValue(state);
  }, [state]);

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
    <div className={`flex items-center text-xl ${inline ? 'flex-row-reverse gap-1' : 'flex-col'}`}>
      <button onClick={handleIncrement} className={`${value === max ? "text-grey" : ""}`}>
        <RiArrowUpSLine />
      </button>
      <span className={`${inline ? 'text-xl' : 'text-2xl'}`}>{value}</span>
      <button onClick={handleDecrement} className={`${value === min ? "text-grey" : ""}`}>
        <RiArrowDownSLine />
      </button>
    </div>
  );
};

export default StepInput;
