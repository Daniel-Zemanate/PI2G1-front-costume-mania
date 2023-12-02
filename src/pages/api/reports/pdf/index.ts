import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { month } = req.query;

      let url = `${process.env.CATALOG_API_URL}/reporting/generatePdfReport`;

      if (month) url += `/${month}`;

      // use axios to get a Readable stream response
      const { data } = await axios.get<Readable>(url, {
        responseType: "stream",
      });

      // Set the correct content type for a PDF file
      res.setHeader("Content-Type", "application/pdf");

      // Set the content-disposition header to trigger the download
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="General_Report.pdf"`
      );

      // Pipe the data stream to the response object
      data.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
