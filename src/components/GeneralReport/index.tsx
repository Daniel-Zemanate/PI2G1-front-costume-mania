import React from "react";
import Button from "../Button";

function GeneralReport() {
  const handleGeneralReportClick = async () => {
    const res = await fetch(`/api/reports/pdf`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank"
    link.click();
  };

  return (
    <>
      <p className="text-2xl text-center">
        Obtain details of the general report
      </p>
      <Button
        buttonStyle="primary"
        label="Download PDF"
        onClick={handleGeneralReportClick}
      />
    </>
  );
}

export default GeneralReport;
