import { costumes } from "@/mockData/costumer"
import { costume } from "@/interfaces/costume"
import { NextApiRequest, NextApiResponse } from "next"

type Data = costume[] | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        res.status(200).json(costumes.slice(-5))
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}