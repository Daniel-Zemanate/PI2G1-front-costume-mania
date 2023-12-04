import React, { useState } from "react";
import Table from "../Table";
import { TableCategory } from "@/interfaces/category";
import { columnsCategories } from "@/utils/categories";
import EditCategoryPopUp from "./EditCategoryPopUp";
import { useSession } from "next-auth/react";
import AddCategoryPopUp from "./AddCategoryPopUp";

type Props = {
  categories: TableCategory[];
  onSave: () => void;
};

function AdminCategories({ categories, onSave }: Props) {
  return (
    <>
      <div className="mb-2">
        <AddCategoryPopUp onSave={onSave} />
      </div>
      <Table
        columns={columnsCategories}
        data={categories}
        renderActions={(rowData: TableCategory) => (
          <>
            <EditCategoryPopUp data={rowData} onSave={onSave} />
          </>
        )}
      />
    </>
  );
}

export default AdminCategories;
