import { TableInvoice } from "@/interfaces/invoice";
import React, { useState } from "react";
import { columnsInvoices } from "@/utils/invoices";
import Table from "../Table";
import EditInvoicePopUp from "./EditInvoicePopUp";

type Props = {
  invoices: TableInvoice[];
  onSave: () => void;
};

function AdminInvoices({ invoices, onSave }: Props) {
  return (
    <Table
      columns={columnsInvoices}
      data={invoices}
      renderActions={(rowData: TableInvoice) => (
        <>
          <EditInvoicePopUp data={rowData} onSave={onSave} />
        </>
      )}
    />
  );
}

export default AdminInvoices;
