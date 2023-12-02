export interface Invoice {
  no_invoice:   number;
  status:       string;
  items:        Item[];
  shippingCity: string;
  shippingcost: number;
  total:        number;
  invoiceDate:  Date;
  shippingDate: null;
}

export interface Item {
  catalog:  number;
  model:    string;
  quantity: number;
  price:    number;
  image:    string;
  pxQ:      number;
}