import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const url = `${process.env.PRODUCT_API_URL}/fav/user/${id}`;
    const response = await fetch(url);
    
    let data;
    if (response.ok) {
      data = await response.json();
    } else {
      data = [];
    }

    res.status(200).json(data);
  } else if (req.method === "POST") {
    res.status(200).json("asda");
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
