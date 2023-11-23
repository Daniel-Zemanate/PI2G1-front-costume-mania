import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await fetch(`${process.env.PRODUCT_API_URL}/sale/startSale`, {
      method: "POST",
      body: req.body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      console.error(response)
      throw new Error("Service unavailable");
    }

    const data = await response.json()
    
    res.status(response.status).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
