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

  if (req.method === "PUT") {
    const { id } = req.query;

    const url = `${process.env.PRODUCT_API_URL}/sale/modify/${id}`;

    console.log(req.body)
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
      body: req.body,
    });

    console.log(response)

    if (response.ok) {
      const data = response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json(response.statusText)
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
