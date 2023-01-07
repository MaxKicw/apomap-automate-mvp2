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
    let scheduledId: string | undefined;
    //Check inputs
    const input = schema.parse(req.body);
    //Check auth
    const token = await hasAuth(req);
    //Make mutation
    const doc = await admin.firestore().collection("tasks").doc(input.id).get();
    const data = doc.data() as Task;
    const isScheduledDoc = await admin
      .firestore()
      .collection("schedules")
      .where("taskId", "==", input.id)
      .get();
    if (isScheduledDoc.empty) {
      scheduledId = undefined
      
    } else {
       isScheduledDoc.forEach(doc => scheduledId = doc.id)
    }
    
    if (data.owner === token.uid && scheduledId !== undefined) {
      try {
        await admin.firestore().collection("tasks").doc(input.id).delete();
        await admin.firestore().collection("schedules").doc(scheduledId).delete();
        res.status(200).json({ msg: "task successfully deleted and un-scheduled" });
      } catch (error) {
        res.status(400).json({ msg: "item not found" });
      }
    } else {
      try {
        await admin.firestore().collection("tasks").doc(input.id).delete();
        res.status(200).json({ msg: "task successfully deleted" });
      } catch (error) {
        res.status(400).json({ msg: "item not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "mutation was not successfull" });
  }
}
