import { GridColDef } from "@mui/x-data-grid";

export const columnsCatalog: GridColDef[] = [
    { headerName: 'Id', field: 'idCatalog', flex: 1 },
    { headerName: 'Model', field: 'model', flex: 2, valueGetter: (params) => params.value.nameModel },
    { headerName: 'Adult', field: 'adult', flex: 1, valueGetter: (params) => params.row.size.adult ? "Yes" : "No" },
    { headerName: 'Size', field: 'size', flex: 1, valueGetter: (params) => params.row.size.noSize },
    { headerName: 'Status', field: 'statusCatalog', flex: 1, valueGetter: (params) => params.value.description },
    { headerName: 'Stock', field: 'stock', flex: 1 },
    { headerName: 'Price', field: 'price', flex: 1 },
    { headerName: 'Category', field: 'category', flex: 1, valueGetter: (params) => params.row.model.category.name }
]