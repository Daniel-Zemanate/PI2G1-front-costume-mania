import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const url = `${process.env.PRODUCT_API_URL}/catalog/byModel/${id}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(response);
      throw new Error("Service unavailable");
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
