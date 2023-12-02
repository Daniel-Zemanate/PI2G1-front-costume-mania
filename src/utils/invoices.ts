import { GridColDef } from "@mui/x-data-grid";

export const columnsInvoices: GridColDef[] = [
    { headerName: 'Invoice', field: 'id', flex: 1 },
    { headerName: 'Shipping City', field: 'shippingCity', flex: 2 },
    { headerName: 'Shipping Cost', field: 'shippingcost', flex: 1 },
    { headerName: 'Total', field: 'total', flex: 1 },
    { headerName: 'Status', field: 'status', flex: 3 },
    { headerName: 'Invoice Date', field: 'invoiceDate', flex: 1 },
    { headerName: 'Shipping Date', field: 'shippingDate', flex: 1 },
]

export function formatInvoiceDate(dateString: Date | null) {
    if(!dateString) return null
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }