import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorizationHeader = req.headers.authorization;

  console.log(authorizationHeader)

  if (!authorizationHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const response = await fetch(
        `${process.env.PRODUCT_API_URL}/sale/invoice/user/${id}`,
        {
          headers: {
            Authorization: authorizationHeader,
          },
        }
      );

      if (!response.ok) {
        console.error(response);
        throw new Error("Service unavailable");
      }

      const data = await response.json();

      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;

      const response = await fetch(
        `${process.env.PRODUCT_API_URL}/sale/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: authorizationHeader,
          },
        }
      );

      console.log(response)

      if (!response.ok) {
        console.error(response);
        throw new Error("Service unavailable");
      }

      const data = await response.json();

      console.log(data)

      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
