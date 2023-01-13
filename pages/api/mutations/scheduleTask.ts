
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { withSentry } from "@sentry/nextjs";
import { errorLogger } from "../../../ErrorLogger/errorLogger";


const schema = z.object({
  id: z.string(),
  status: z.string(),
  time: z.string(),
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
    const doc = await admin
      .firestore()
      .collection("schedules")
      .doc(input.id)
      .set({
        taskId: input.id,
        status: input.status,
        time: input.time
      });
    //Send response
    res.status(200).json(doc);
  } catch (error) {
    errorLogger("BACKEND: Error scheduling task", error)
    res.status(400).json({ msg: "task schedule was not successfull", error });
  }
}

export default withSentry(handler)