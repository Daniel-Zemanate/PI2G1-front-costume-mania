import Table from "../Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button";
import PopUp from "../PopUp";
import { columnsModel } from "@/utils/models";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";





// DEFINIR DENTRO DE CADA COMPONENTE <PopUp/> EL CONTENIDO DEL POP UP Y ACCIONES

const renderActions = (rowData: any) => {
    function testClickEdit(rowData: any): void {
        throw new Error("Function not implemented.");
    }

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
  
function AdminModels({
    data,
  }: {
    data: any[];
  }) {
    return (
      <>
        <Table
          columns={columnsModel}
          data={data}
          renderActions={renderActions}
        />
      </>
    );
  }

export default AdminModels;
