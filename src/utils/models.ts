import { GridColDef } from "@mui/x-data-grid";

export const columnsModel: GridColDef[] = [
    { headerName: 'Id', field: 'id', flex: 1 },
    { headerName: 'Model', field: 'model', flex: 2 },
    { headerName: 'Category', field: 'category', flex: 1 }
]