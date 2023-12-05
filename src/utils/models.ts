import { GridColDef } from "@mui/x-data-grid";

export const columnsModel: GridColDef[] = [
    { headerName: 'Id', field: 'idModel', flex: 1, minWidth: 100 },
    { headerName: 'Model', field: 'nameModel', flex: 2, minWidth: 150 },
    { headerName: 'Status', field: 'status', flex: 1, minWidth: 100 },
    { headerName: 'Category', field: 'category', flex: 1, minWidth: 100, valueGetter: (params) => params.row.category.name }
];

export const modelStatus = [
    { key: '1', value: 'Active' },
    { key: '2', value: 'Inactive' },
  ]