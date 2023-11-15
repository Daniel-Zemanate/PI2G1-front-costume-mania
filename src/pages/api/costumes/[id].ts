import { costumes } from "@/mockData/customer"
import { unifyObjects } from "@/utils/costumes";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { id } = req.query
        // res.status(200).json(costumes.find(x => x.idModel = Number(id)))
        const url = `${process.env.PRODUCT_API_URL}/catalog/byModel/${id}`;
        const response = await fetch(url);
        const data = await response.json()
        console.log(data)
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }
}