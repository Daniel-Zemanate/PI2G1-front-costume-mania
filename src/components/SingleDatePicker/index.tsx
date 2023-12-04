import React, { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeProps extends ReactDatePickerProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function SingleDatePicker({ date, setDate, ...props }: DateRangeProps) {
  return (
    <DatePicker
      selected={date}
      className="cursor-pointer text-center rounded border border-purple-2 text-purple-2 w-full"
      dateFormat="dd/MM/yyyy"
      closeOnScroll
      {...props}
    />
  );
}

export default SingleDatePicker;
