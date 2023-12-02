import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function SingleDatePicker({ date, setDate }: DateRangeProps) {
  return (
      <DatePicker
        selected={date}
        onChange={(date: Date | null) => setDate(date)}
        className="cursor-pointer text-center rounded border border-purple-2 text-purple-2 w-full"
        dateFormat="dd/MM/yyyy"
        closeOnScroll
        maxDate={new Date()}
      />
  );
}

export default SingleDatePicker;
