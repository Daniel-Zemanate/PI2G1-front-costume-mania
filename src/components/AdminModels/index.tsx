import React from "react";
import Table from "../Table";
import PopUp from "../PopUp";
import { FaEdit, FaTrash } from "react-icons/fa";
import { columnsModel } from "@/utils/models";
import AddModelPopUp from "./AddModelPopUp";

// DEFINIR DENTRO DE CADA COMPONENTE <PopUp/> EL CONTENIDO DEL POP UP Y ACCIONES

function AdminModels({ data }: { data: any[] }) {
  const renderActions = (rowData: any) => {
    const model = data.find((e) => e.idModel === rowData.idModel);
    return (
      <>
        <PopUp button={<FaTrash />}>
          <p>test delete</p>
          <p>{rowData.idModel}</p>
          <p>{rowData.nameModel}</p>
        </PopUp>
        <PopUp button={<FaEdit />}>
          <p>test edit</p>
          <p>{rowData.idModel}</p>
          <p>{rowData.nameModel}</p>
        </PopUp>
      </>
    );
  };

  function getRowId(row: any) {
    return row.idModel;
  }

  return (
    <>
      <div className="mb-2">
        <AddModelPopUp
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <Table
        getRowId={getRowId}
        columns={columnsModel}
        data={data}
        renderActions={renderActions}
      />
    </>
  );
}

export default AdminModels;
