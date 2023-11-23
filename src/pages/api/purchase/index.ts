import { Purchase } from "@/interfaces/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Purchase | { message: string}>
) {
  if (req.method === "POST") {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    const response = await fetch(`${process.env.PRODUCT_API_URL}/sale/create`, {
      method: "POST",
      body: req.body,
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
      },
    });
    const data = await response.json()
    
    res.status(response.status).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
