import { GridColDef } from "@mui/x-data-grid";

export const columnsModel: GridColDef[] = [
    { headerName: 'Id', field: 'idModel', flex: 1 },
    { headerName: 'Model', field: 'nameModel', flex: 2 },
    { headerName: 'Category', field: 'category', flex: 1, valueGetter: (params) => params.row.category.name }
]
