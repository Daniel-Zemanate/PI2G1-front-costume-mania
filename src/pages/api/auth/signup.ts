import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await fetch(
      `${process.env.PRODUCT_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: req.body,
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
