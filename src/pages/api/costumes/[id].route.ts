import { getCostume } from "@/services/costumes_mock.service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { id } = req.query
        res.status(200).json(await getCostume(Number(id)))
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}