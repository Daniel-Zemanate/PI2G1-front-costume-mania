export interface UserData {
  id: number;
  dni: string;
  email: string;
  first_name: string;
  last_name: string;
  status: boolean;
  soft_delete: boolean;
  created_at: string;
  updated_at: string;
  role: 'USER' | 'ADMIN' | 'GUEST'; // You might have more roles
}

export interface Order {
  no_invoice:   number;
  status:       string;
  items:        Item[];
  shippingCity: string;
  shippingcost: number;
  total:        number;
}

export interface Item {
  catalog:  number;
  model:    string;
  quantity: number;
  price:    number;
  pxQ:      number;
}

export interface Purchase {
  invoiceNumber: number;
  itemSoldList:  ItemSoldList[];
  shippingCost:  number;
  total:         number;
  errorMessage:  null;
}

export interface ItemSoldList {
  catalog:      number;
  quantitySold: number;
  partialTotal: number;
}