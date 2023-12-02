import { Invoice, TableInvoice } from "@/interfaces/invoice";
import React from "react";
import PopUp from "../PopUp";
import { FaTrash } from "react-icons/fa";
import { columnsInvoices } from "@/utils/invoices";
import Table from "../Table";
import EditInvoicePopUp from "./EditInvoicePopUp";

const renderActions = (rowData: TableInvoice) => {
  return (
    <>
      <EditInvoicePopUp data={rowData} />
      <PopUp button={<FaTrash />}>
        <p>test delete</p>
        <p>{rowData.id}</p>
        <p>{rowData.shippingcost}</p>
      </PopUp>
    </>
  );
};

type Props = {
  invoices: Invoice[];
};

function AdminInvoices({ invoices }: Props) {
  return (
    <Table
      columns={columnsInvoices}
      data={invoices}
      renderActions={renderActions}
    />
  );
}

export default AdminInvoices;
