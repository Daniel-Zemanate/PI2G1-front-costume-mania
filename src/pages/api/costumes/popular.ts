import { ApiCostume } from "@/interfaces/costume";
import { NextApiRequest, NextApiResponse } from "next";

type Data = ApiCostume[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      let url = `${process.env.CATALOG_API_URL}/catalog/news/10`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Service unavailable");
      }

      const data: ApiCostume[] = await response.json();
      const reversedData = data.reverse(); // Reversing the array

      res.status(200).json(reversedData);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: "Service unavailable" });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
