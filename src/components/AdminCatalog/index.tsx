import { CatalogDataTable } from '@/interfaces/catalog';
import React from 'react';
import Table from '../Table';


export type Column = {
  Header: string;
  accessor: any; // el nombre de la propiedad
};


function AdminCatalog({ columns, data }: { columns: Column[], data: CatalogDataTable[] }) {
  return (
    <>
      <Table columns={columns} data={data}></Table>
    </>
  );
}

export default AdminCatalog;
