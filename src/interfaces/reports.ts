export interface Report {
  generalShippingTime:  GeneralShippingTime;
  minDelay:             string;
  maxDelay:             string;
  detailedShippingTime: DetailedShippingTime[];
}

export interface DetailedShippingTime {
  period:              string;
  averageShippingTime: number;
}

export interface GeneralShippingTime {
  firstDate:              string;
  lastDate:               string;
  quantitySales:          number;
  quantityDeliveredSales: number;
  averageDelay:           number;
}