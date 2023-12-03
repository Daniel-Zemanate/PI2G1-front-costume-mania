import { Invoice, InvoiceStatus } from "@/interfaces/invoice";
import { formatInvoiceDate } from "@/utils/invoices";

export const getAdminInvoices = async () => {
  const url = `${process.env.PRODUCT_API_URL}/sale/invoice`;
  const response = await fetch(url);
  const data = await response.json();

  const formattedData = data.map((invoice: Invoice) => ({
    ...invoice,
    id: invoice.no_invoice,
    invoiceDateString: formatInvoiceDate(invoice.invoiceDate),
    shippingDateString: formatInvoiceDate(invoice.shippingDate),
  }));

  return formattedData;
};

export const getInvoiceStatus = async () => {
  const url = `${process.env.PRODUCT_API_URL}/status`;
  const response = await fetch(url);
  const data = await response.json();

  const formattedData = data.map((item: InvoiceStatus) => {
    return {
      key: String(item.idStatus),
      value: item.status
    };
  });

  return formattedData;
}