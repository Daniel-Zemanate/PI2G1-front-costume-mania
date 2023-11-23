import { Costume } from "@/interfaces/costume";
import { NextApiRequest, NextApiResponse } from "next";

type Data = Costume[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      let url = `${process.env.CATALOG_API_URL}/catalog/news/10`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error(response)
        throw new Error("Service unavailable");
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: "Service unavailable" });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
