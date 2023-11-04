import { Costume } from "@/interfaces/costume";
import { NextApiRequest, NextApiResponse } from "next";

type Data = Costume[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const {page, category, name, size } = req.query;

    console.log(size)
    
    let url = `${process.env.CATALOG_API_URL}/catalog/page/${page}`;

    // if(size) url = `${process.env.CATALOG_API_URL}/catalog/bySize/${size}`
    // if(name){
    //     url += `/name/${name}`
    // }
    // if(category){
    //     url += `/category/id/${category}`
    // }

    const response = await fetch(url);
    const data = await response.json()

    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
