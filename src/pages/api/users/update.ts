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

    const response = await fetch(
      `${process.env.PRODUCT_API_URL}/users/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationHeader,
        },
        body: req.body,
      }
    );

    if (response.status === 400) {
      res.status(400).json({ message: "Método no permitido" });
    }

    const data = await response.json();

    res.status(response.status).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
