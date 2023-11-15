import { costumes } from "@/mockData/customer";
import { ApiCostume } from "@/interfaces/costume";
import { NextApiRequest, NextApiResponse } from "next";
import { unifyObjects } from "@/utils/costumes";

type Data = ApiCostume[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    let url = `${process.env.CATALOG_API_URL}/catalog/popular`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(unifyObjects(data));
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
