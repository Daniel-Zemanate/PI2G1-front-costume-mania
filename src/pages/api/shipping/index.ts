import { ApiShipping } from "@/interfaces/shipping";
import { NextApiRequest, NextApiResponse } from "next";

type Data = ApiShipping[] | { message: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        let url = `${process.env.CATALOG_API_URL}/shipping`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } else {
        res.status(400).json({ message: "Método no permitido" });
    }
}
