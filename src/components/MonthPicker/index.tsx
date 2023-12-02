import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MonthPickerProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function MonthPicker({ startDate, setStartDate }: MonthPickerProps) {
  return (
    <div className="w-1/3 flex flex-col">
      <small>Month: </small>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        className="cursor-pointer w-full text-center p-2 rounded border border-purple-2 text-purple-2"
        wrapperClassName="w-full"
        dateFormat="MM/yyyy"
        showMonthYearPicker
        closeOnScroll
        maxDate={new Date()}
      />
    </div>
  );
}

export default MonthPicker;
