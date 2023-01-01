// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { Task } from "../../../src/types/Task";

const schema = z.object({
  id: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Check inputs
    const input = schema.parse(req.body);
    //Check auth
    const token = await hasAuth(req);
    //Make query
    const doc = await admin.firestore().collection("tasks").doc(input.id).get();
    //Check doc
    const data = doc.data() as Task;
    if (data.owner === token.uid) {
      res.status(200).json({ data: data });
    } else {
      res.status(200).json({ msg: "task not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: "query was not successfull" });
  }
}
