import React, { useState } from "react";
import Button from "../Button";
import MonthPicker from "../MonthPicker";
import Swal from "sweetalert2";

function MonthlyReport() {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleMonthReportClick = async () => {
    if (date) {
      const stringMMYYDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
      const searchParams = new URLSearchParams({
        month: stringMMYYDate,
      });

      const res = await fetch(`/api/reports/pdf?${searchParams.toString()}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.click();
      } else {
        Swal.fire({
          icon: "error",
          title: "No available report",
          text: `There is no report available for the period ${stringMMYYDate}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  };

  return (
    <>
      <p className="text-2xl text-center">Obtain details for specific month</p>
      <MonthPicker startDate={date} setStartDate={setDate} />
      <Button
        buttonStyle="primary"
        label="Download PDF"
        onClick={handleMonthReportClick}
      />
    </>
  );
}

export default MonthlyReport;
