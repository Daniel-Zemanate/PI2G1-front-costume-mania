import React from "react";
import Table from "../Table";
import { columnsModel } from "@/utils/models";
import AddModelPopUp from "./AddModelPopUp";
import { TableModel } from "@/interfaces/model";
import EditModelPopUp from "./EditModelPopUp";

type Props = {
  models: TableModel[];
  onSave: () => void;
};

function AdminModels({ models, onSave }: Props) {
  return (
    <>
      <div className="mb-2">
        <AddModelPopUp onSave={onSave} />
      </div>
      <Table
        columns={columnsModel}
        data={models}
        renderActions={(rowData: TableModel) => (
          <>
            <EditModelPopUp data={rowData} onSave={onSave} />
          </>
        )}
      />
    </>
  );
}

export default AdminModels;
