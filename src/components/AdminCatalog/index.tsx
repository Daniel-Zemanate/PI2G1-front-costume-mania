import { CatalogDataTable } from '@/interfaces/catalog';
import React from 'react';
import Table from '../Table';
import { columnsCatalog } from '@/utils/catalogs';


function AdminCatalog({ data }: { data: CatalogDataTable[] }) {
  return (
    <>
      <Table columns={columnsCatalog} data={data}></Table>
    </>
  );
}

export default AdminCatalog;
