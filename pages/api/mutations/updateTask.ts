// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { late, z } from "zod";
import hasAuth from "../utils/hasAuth";
import { Task } from "../../../src/types/Task";
import dayjs from "dayjs";

const schema = z.object({
  id: z.string(),
  customerName: z.string().optional(),
  coords: z.object({ lat: z.number(), lon: z.number() }).optional(),
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
    //Make mutation
    const doc = await admin.firestore().collection("tasks").doc(input.id).get();
    const data = doc.data() as Task;
    if (data.owner === token.uid) {
      await admin
        .firestore()
        .collection("tasks")
        .doc(input.id)
        .update({
          ...(input.customerName && { customerName: input.customerName }),
          ...(input.coords && { coords: input.coords }),
          updatedAt: dayjs().toISOString(),
        });
      res.status(200).json({ msg: "task successfully updated" });
    } else {
      res.status(400).json({ msg: "item not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: "mutation was not successfull" });
  }
}
