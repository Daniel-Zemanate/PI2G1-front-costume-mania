import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    try {
      const response = await fetch(`${process.env.PRODUCT_API_URL}/users/me`, {
        headers: {
          "Authorization": authorizationHeader,
        },
      });
      const data = await response.json();
      
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
