import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const url = `${process.env.PRODUCT_API_URL}/category`;
    const response = await fetch(url);
    const data = await response.json()

    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
