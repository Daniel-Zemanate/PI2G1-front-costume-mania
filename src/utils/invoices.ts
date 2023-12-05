import { GridColDef } from "@mui/x-data-grid";

export const columnsInvoices: GridColDef[] = [
    { headerName: 'Invoice', field: 'id', flex: 1, minWidth: 100 },
    { headerName: 'Shipping City', field: 'shippingCity', flex: 2, minWidth: 150 },
    { headerName: 'Shipping Cost', field: 'shippingcost', flex: 2, minWidth: 150 },
    { headerName: 'Total', field: 'total', flex: 1, minWidth: 100 },
    { headerName: 'Status', field: 'status', flex: 3, minWidth: 200 },
    { headerName: 'Invoice Date', field: 'invoiceDateString', flex: 2, minWidth: 150 },
    { headerName: 'Shipping Date', field: 'shippingDateString', flex: 2, minWidth: 150 },
];

export function formatInvoiceDate(dateString: Date | null) {
    if(!dateString) return null
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }