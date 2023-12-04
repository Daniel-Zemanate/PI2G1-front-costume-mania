import { Invoice } from "@/interfaces/invoice";
import { formatInvoiceDate } from "@/utils/invoices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const url = `${process.env.PRODUCT_API_URL}/sale/invoice`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error(response);
        throw new Error("Service unavailable");
      }

      const data = await response.json();
      const formattedData = data.map((invoice: Invoice) => ({
        ...invoice,
        id: invoice.no_invoice,
        invoiceDateString: formatInvoiceDate(invoice.invoiceDate),
        shippingDateString: formatInvoiceDate(invoice.shippingDate),
      }));

      res.status(200).json(formattedData);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
