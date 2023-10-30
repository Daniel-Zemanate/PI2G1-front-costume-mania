import { costumes } from "@/mockData/customer"
import { Costume } from "@/interfaces/costume"
import { NextApiRequest, NextApiResponse } from "next"

type Data = Costume[] | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        res.status(200).json(costumes.slice(-5))
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}