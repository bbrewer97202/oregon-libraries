import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data/data.json";
// import { Library } from "../types";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(data);
};
