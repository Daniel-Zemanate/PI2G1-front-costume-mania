import { GridColDef } from "@mui/x-data-grid";

export const columnsCatalog: GridColDef[] = [
    { headerName: 'Id', field: 'id', flex: 1 },
    { headerName: 'Model', field: 'model', flex: 2 },
    { headerName: 'Adult', field: 'adult', flex: 1 },
    { headerName: 'Size', field: 'size', flex: 1 },
    { headerName: 'Status', field: 'status', flex: 1 },
    { headerName: 'Stock', field: 'stock', flex: 1 },
    { headerName: 'Price', field: 'price', flex: 1 },
    { headerName: 'Category', field: 'category', flex: 1 }
]