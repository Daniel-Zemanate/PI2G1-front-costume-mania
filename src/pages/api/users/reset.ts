import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await fetch(
      `${process.env.PRODUCT_API_URL}/users/reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: req.body,
      }
    );

    if(response.ok){
        res.status(200).json({message: "A temporary password will be sent to your inbox. Upon login, you'll have the option to change this password in 'My Account' section."});
    } else {
        res.status(400).json({message: "The email does not belong to any registered account. Please, sign up in the corresponding page"})
    }
  } else {
    res.status(400).json({ message: "Método no permitido" });
  }
}
