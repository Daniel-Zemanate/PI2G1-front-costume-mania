import { costumes } from "@/mockData/customer"
import { ApiCostume } from "@/interfaces/costume"
import { NextApiRequest, NextApiResponse } from "next"

type Data = ApiCostume[] | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        console.log(costumes)
        res.status(200).json(costumes.slice(-5))
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}