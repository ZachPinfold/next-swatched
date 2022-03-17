// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  colourData: number[] | string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const url = "http://colormind.io/api/";

    const headers = {
      "Content-Type": "text/plain",
    };
    
    const result = await axios.post(url, req.body, { headers });

    const responseData = result.data.result;

    res.status(200).json({ colourData: responseData });
  } catch (error) {
    if (error) {
      let errorMessage = "Failed to return colour";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
      return res.status(500).json({ colourData: errorMessage });
    }
  }
};

export default handler;
