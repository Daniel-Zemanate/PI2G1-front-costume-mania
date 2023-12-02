import { CatalogDataTable } from "@/interfaces/catalog";
import React from "react";
import Table from "../Table";
import { columnsCatalog } from "@/utils/catalogs";
import { GridColDef } from "@mui/x-data-grid";
import PopUp from "../PopUp";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button";

const testClickEdit = (data: any) => {
  alert(data.model);
};

// DEFINIR DENTRO DE CADA COMPONENTE <PopUp/> EL CONTENIDO DEL POP UP Y ACCIONES

const renderActions = (rowData: any) => {
  return (
    <>
      <PopUp button={<FaEdit />}>
        <p>test edit</p>
        <p>{rowData.id}</p>
        <p>{rowData.model}</p>
        <Button
          label="TEST"
          buttonStyle="primary"
          size="small"
          onClick={() => testClickEdit(rowData)}
        />
      </PopUp>
      <PopUp button={<FaTrash />}>
        <p>test delete</p>
        <p>{rowData.id}</p>
        <p>{rowData.model}</p>
      </PopUp>
    </>
  );
};

function AdminCatalog({
  data,
}: {
  data: any[];
}) {
  return (
    <>
      <Table
        columns={columnsCatalog}
        data={data}
        renderActions={renderActions}
      />
    </>
  );
}

export default AdminCatalog;
