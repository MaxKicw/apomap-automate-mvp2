// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { Task } from "../../../src/types/Task";

const deleteRelatedSchedules = (scheduleIds: string[]) =>
  Promise.all(
    scheduleIds.map((id) =>
      admin.firestore().collection("schedules").doc(id).delete()
    )
  );

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
    //Make mutation
    const doc = await admin.firestore().collection("tasks").doc(input.id).get();
    const data = doc.data() as Task;
    //Getting related schedule
    const schedules = await admin
      .firestore()
      .collection("schedules")
      .where("taskId", "==", input.id)
      .get();

    const scheduleIds = schedules.docs
      .map((doc) => doc.data())
      .map((doc) => doc.id);

    if (data.owner !== token.uid) {
      throw new Error();
    }
    await admin.firestore().collection("tasks").doc(input.id).delete();
    scheduleIds.length && (await deleteRelatedSchedules(scheduleIds));
    res.status(200).json({ msg: "task successfully deleted" });
  } catch (error) {
    res.status(400).json({ msg: "item not found" });
  }
}
