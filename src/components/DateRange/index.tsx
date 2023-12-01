import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangeProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

function DateRange({ startDate, setStartDate, endDate, setEndDate }: DateRangeProps) {
  return (
    <div className="flex justify-between">
      <div className="w-2/5 md:w-1/3 flex flex-col">
        <small>From: </small>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="cursor-pointer w-full text-center p-2 rounded border border-purple-2 text-purple-2"
          wrapperClassName="w-full"
          dateFormat="dd/MM/yyyy"
          closeOnScroll
          maxDate={new Date()}
        />
      </div>
      <div className="w-2/5 md:w-1/3 flex flex-col">
        <small>To:</small>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="cursor-pointer w-full text-center p-2 rounded border border-purple-2 text-purple-2"
          wrapperClassName="w-full"
          dateFormat="dd/MM/yyyy"
          closeOnScroll
          maxDate={new Date()}
        />
      </div>
    </div>
  );
}

export default DateRange;
