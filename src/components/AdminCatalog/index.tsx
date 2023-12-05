import React from "react";
import Table from "../Table";
import { columnsCatalog } from "@/utils/catalogs";
import EditCatalogPopUp from "./EditCatalogPopUp";
import { Catalog, TableCatalog } from "@/interfaces/catalog";
import AddCatalogPopUp from "./AddCatalogPopUp";;
import { useSession } from "next-auth/react";
import DeleteCatalogPopUp from "./DeleteCatalogPopUp";
import { FaTrash } from "react-icons/fa";
import PopUp from "../PopUp";

type Props = {
  catalogs: TableCatalog[];
  onSave: () => void;
};

function AdminCatalog({ catalogs, onSave }: Props) {

  function getRowId(row: any) {
    return row.idCatalog;
  }

  return (
    <>
      <div className="mb-2">
        <AddCatalogPopUp onSave={onSave} />
      </div>
      <Table
        getRowId={getRowId}
        columns={columnsCatalog}
        data={catalogs}
        renderActions={(rowData: Catalog) => (
          <>
            <EditCatalogPopUp data={rowData} onSave={onSave} />
            {/*
            <DeleteCatalogPopUp data={rowData} onSave={onSave} />
            */}
          </>
        )}
      />
    </>
  );
}

export default AdminCatalog;
