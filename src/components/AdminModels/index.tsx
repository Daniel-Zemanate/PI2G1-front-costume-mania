import React from "react";
import Table from "../Table";
import PopUp from "../PopUp";
import { FaEdit, FaTrash } from "react-icons/fa";
import { columnsModel } from "@/utils/models";
import AddModelPopUp from "./AddModelPopUp";
import { TableModel } from "@/interfaces/model";

type Props = {
  models: TableModel[];
  onSave: () => void;
};

function AdminModels({ models, onSave }: Props) {
  const renderActions = (rowData: any) => {
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

  return (
    <>
      <div className="mb-2">
        <AddModelPopUp onSave={onSave} />
      </div>
      <Table
        columns={columnsModel}
        data={models}
        renderActions={renderActions}
      />
    </>
  );
}

export default AdminModels;
