export interface Invoice {
  no_invoice:   number;
  status:       string;
  items:        InvoiceItem[];
  shippingCity: string;
  shippingcost: number;
  total:        number;
  invoiceDate:  any;
  shippingDate: any;
}

export interface InvoiceItem {
  catalog:  number;
  model:    string;
  quantity: number;
  price:    number;
  image:    string;
  pxQ:      number;
}

export interface InvoiceStatus {
  idStatus: number;
  status: string;
}

export type TableInvoice = Invoice & { id: string };