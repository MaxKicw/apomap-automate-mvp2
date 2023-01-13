// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { Task } from "../../../src/types/Task";
import { withSentry } from "@sentry/nextjs";
import { errorLogger } from "../../../ErrorLogger/errorLogger";

const deleteRelatedSchedules = (scheduleId: string) =>
  admin.firestore().collection("schedules").doc(scheduleId).delete();

const schema = z.object({
  id: z.string(),
});

async function handler(
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
    const schedule = await admin
      .firestore()
      .collection("schedules")
      .doc(input.id)
      .get()

    if (data.owner !== token.uid) {
      throw new Error();
    }
    await admin.firestore().collection("tasks").doc(input.id).delete();
    schedule.exists && (await deleteRelatedSchedules(input.id));
    res.status(200).json({ msg: "task successfully deleted" });
  } catch (error) {
    errorLogger("BACKEND: Error deleting task", error)
    res.status(400).json({ msg: "item not found" });
  }
}

export default withSentry(handler)