import React, { useState, useEffect } from "react";
import DateRange from "../DateRange";
import Button from "../Button";

import { formatJSDateToISODate } from "@utils/reports";
import Swal from "sweetalert2";

function CustomPeriodReport() {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handlePeriodReportClick = async () => {
    if (!startDate || !endDate) return;

    const searchParams = new URLSearchParams({
      from: formatJSDateToISODate(startDate),
      to: formatJSDateToISODate(endDate),
    });

    const res = await fetch(`/api/reports/pdf/dates?${searchParams.toString()}`);
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
        text: `There is no report available for the period ${formatJSDateToISODate(startDate)} to ${formatJSDateToISODate(endDate)}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <p className="text-2xl text-center">Obtain details for a custom period</p>
      <DateRange
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Button
        buttonStyle="primary"
        label="Download PDF"
        onClick={handlePeriodReportClick}
      />
    </>
  );
}

export default CustomPeriodReport;
