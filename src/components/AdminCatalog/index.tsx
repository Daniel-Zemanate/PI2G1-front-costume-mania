import React from "react";
import Table from "../Table";
import { columnsCatalog } from "@/utils/catalogs";
import PopUp from "../PopUp";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button";
import EditCatalogPopUp from "./EditCatalogPopUp";
import { Catalog } from "@/interfaces/catalog";

const testClickEdit = (data: any) => {
  alert(data.model);
};

// DEFINIR DENTRO DE CADA COMPONENTE <PopUp/> EL CONTENIDO DEL POP UP Y ACCIONES



function AdminCatalog({
  data,
}: {
  data: any[];
}) {

  const renderActions = (rowData: any) => {
    const catalog = data.find(e => e.idCatalog === rowData.idCatalog)
    return (
      <>
        <EditCatalogPopUp data={catalog} />
        <PopUp button={<FaTrash />}>
          <p>test delete</p>
          <p>{rowData.id}</p>
          <p>{rowData.model}</p>
        </PopUp>
      </>
    );
  };

  function getRowId(row: any) {
    return row.idCatalog;
  }

  return (
    <>
      <Table
        getRowId={getRowId}
        columns={columnsCatalog}
        data={data}
        renderActions={(rowData: Catalog) => (
          <>
            <EditCatalogPopUp data={rowData} />
            <PopUp button={<FaTrash />}>
              <p>test delete</p>
              <p>{rowData.idCatalog}</p>
              <p>{rowData.model.nameModel}</p>
            </PopUp>
          </>
        )}
      />
    </>
  );
}

export default AdminCatalog;
