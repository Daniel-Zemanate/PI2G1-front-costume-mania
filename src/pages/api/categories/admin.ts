import { AdminCategory } from "@/interfaces/category";
import { Invoice } from "@/interfaces/invoice";
import { formatInvoiceDate } from "@/utils/invoices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  if (req.method === "GET") {
    try {
      const url = `${process.env.PRODUCT_API_URL}/category/all`;
      const response = await fetch(url, {
        headers: {
          Authorization: authorizationHeader,
        },
      });

      console.log(response)

      const data = await response.json();

      const formattedData = data.map((category: AdminCategory) => ({
        ...category,
        id: category.idCategory,
        status: category.statusCategory.description,
        idStatus: String(category.statusCategory.id),
      }));

      res.status(200).json(formattedData);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: error });
    }
  } else if (req.method === "POST") {
    try {
      const url = `${process.env.PRODUCT_API_URL}/category/create`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: authorizationHeader,
          "Content-Type": "application/json"
        },
        body: req.body
      });

      res.status(200).json(response.statusText);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
