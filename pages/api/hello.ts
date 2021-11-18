// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const url = "http://colormind.io/api/";
  const data = {
    model: "default",
  };
  const headers = {
    "Content-Type": "text/plain",
  };
  const result = await axios.post(url, data, { headers });
  const responseData = result.data.result;

  res.status(200).json({ name: responseData });
};

export default handler;
