import { TableInvoice } from "@/interfaces/invoice";
import React, { useState } from "react";
import { columnsInvoices } from "@/utils/invoices";
import Table from "../Table";
import EditInvoicePopUp from "./EditInvoicePopUp";

type Props = {
  invoices: TableInvoice[];
};

function AdminInvoices({ invoices: initialInvoices }: Props) {
  const [invoices, setInvoices] = useState<TableInvoice[]>(initialInvoices);

  const fetchUpdatedInvoices = async () => {
    try {
      const response = await fetch(`/api/invoices`);
      if (response.ok) {
        const updatedInvoices = await response.json();
        setInvoices(updatedInvoices);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table
      columns={columnsInvoices}
      data={invoices}
      renderActions={(rowData: TableInvoice) => (
        <>
          <EditInvoicePopUp data={rowData} onSave={fetchUpdatedInvoices} />
        </>
      )}
    />
  );
}

export default AdminInvoices;
