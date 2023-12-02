import { CatalogDataTable } from '@/interfaces/catalog';
import React from 'react';
import Table from '../Table';
import { GridColDef } from '@mui/x-data-grid';


function AdminCatalog({ columns, data }: { columns: GridColDef[], data: CatalogDataTable[] }) {
  return (
    <>
      <Table columns={columns} data={data}></Table>
    </>
  );
}

export default AdminCatalog;
