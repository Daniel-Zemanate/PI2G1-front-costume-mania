import { ApiCostume } from "@/interfaces/costume";
import { unifyObjects } from "@/utils/costumes";
import { NextApiRequest, NextApiResponse } from "next";

type Data = ApiCostume[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { search, category, size } = req.query;
    let url = `${process.env.CATALOG_API_URL}/catalog`;

    if (Object.keys(req.query).length) {
      if (search) url += `/byKeyWord/${search}`;
      if (category) url += `/byCategory/${category}`;
      if (size) url += `/bySize/${size}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(unifyObjects(data));
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
