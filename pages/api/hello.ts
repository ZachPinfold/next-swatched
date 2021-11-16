// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = "http://colormind.io/api/";
  const data = {
    model: "default",
  };
  const headers = {
    "Content-Type": "text/plain",
  };
  axios
    .post(url, data, { headers })
    .then((d) => res.status(200).json({ name: d.data.result }));
}
