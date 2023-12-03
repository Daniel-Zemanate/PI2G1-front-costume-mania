import React, { useState } from "react";
import Table from "../Table";
import { TableCategory } from "@/interfaces/category";
import PopUp from "../PopUp";
import { FaEdit } from "react-icons/fa";
import { columnsCategories } from "@/utils/categories";

type Props = {
  categories: TableCategory[];
};

function AdminCategories({ categories: initialCategories }: Props) {
  const [categories, setCategories] = useState<TableCategory[]>(initialCategories);

  return (
    <Table
      columns={columnsCategories}
      data={categories}
      renderActions={(rowData: TableCategory) => (
        <>
          <PopUp button={<FaEdit />}>
            <p>{rowData.id}</p>  
          </PopUp>
        </>
      )}
    />
  );
}

export default AdminCategories;
