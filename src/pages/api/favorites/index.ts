import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const url = `${process.env.PRODUCT_API_URL}/fav`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const { idFav } = JSON.parse(req.body);
    const response = await fetch(
      `${process.env.PRODUCT_API_URL}/fav/${idFav}`,
      {
        method: "DELETE",
      }
    );
    res.status(response.status).json(response.statusText);
  } else if (req.method === "POST") {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    const response = await fetch(`${process.env.PRODUCT_API_URL}/fav`, {
      method: "POST",
      body: req.body,
      headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
      },
    });
    
    res.status(response.status).json(response.statusText);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
