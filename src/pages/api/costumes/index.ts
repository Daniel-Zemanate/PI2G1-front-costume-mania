import { ApiCostume } from "@/interfaces/costume";
import { NextApiRequest, NextApiResponse } from "next";

type Data = ApiCostume[] | { message: string };

function unifyObjects(arr: Array<any>): Array<any> {
  const unifiedObject: { [key: string]: any } = {};

  arr.forEach((item: any) => {
    const { model, size, quantity, price } = item;
    const { noSize, sizeDescription } = size;
    const { idModel, nameModel, urlImage, category } = model

    if (!unifiedObject[model.nameModel]) {
      unifiedObject[model.nameModel] = {
        idModel: idModel,
        name: nameModel,
        urlImage: urlImage,
        category: category,
        sizes: [],
        price: price
      };
    }

    unifiedObject[model.nameModel].sizes.push({
      quantity,
      noSize,
      sizeDescription
    });
  });

  return Object.values(unifiedObject);
}


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
