import { ApiCostumeResponse } from "@/interfaces/costume";
import { NextApiRequest, NextApiResponse } from "next";

type Data = ApiCostumeResponse | [] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const { search, category, size, page = 1 } = req.query;

      let url = `${process.env.CATALOG_API_URL}/catalog`;

      if (!search && !category && !size) {
        url += `/all`;
      } else {
        if (search) url += `/byKeyWord/${search}`; 
        if (category) url += `/byCategory/${category}`;
        if (size) url += `/bySize/${size}`;
      }

      url += `/page/${Number(page) - 1}`;

      const response = await fetch(url);

      console.log(url)

      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        res.status(200).json(data);
      } else if (response.status === 204) {
        res.status(204).end();
      } else {
        console.error(response);
        throw new Error("Server error");
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error. Please try again later." });
    }
  } else {
    res.status(500).json({ message: "Método no permitido" });
  }
}
