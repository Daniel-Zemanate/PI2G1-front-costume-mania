import { Model } from "@/interfaces/model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const url = `${process.env.PRODUCT_API_URL}/model/all`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error(response);
        throw new Error("Service unavailable");
      }

      const data = await response.json();

      const formattedData = data.map((model: Model) => ({
        ...model,
        id: model.idModel,
        status: model.statusModel.description,
        idStatus: String(model.statusModel.id),
      }));

      res.status(200).json(formattedData);
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: "Service unavailable" });
    }
  } else if (req.method === "POST") {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }
    try {
      const url = `${process.env.PRODUCT_API_URL}/model/create`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: authorizationHeader,
          "Content-Type": "application/json",
        },
        body: req.body,
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else if (response.status === 422) {
        res
          .status(422)
          .json({ message: "Model already exists in specified category" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(503).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
