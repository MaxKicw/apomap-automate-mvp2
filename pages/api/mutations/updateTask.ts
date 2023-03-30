// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from "@sentry/nextjs";
import dayjs from "dayjs";
import * as admin from "firebase-admin";
import * as jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { errorLogger } from "../../../ErrorLogger/errorLogger";
import { Task } from "../../../src/types/Task";
import hasAuth from "../utils/hasAuth";

const schema = z.object({
  id: z.string(),
  status: z.string().optional(),
  customerName: z.string(),
  customer_mail: z.string(),
  customer_mobile: z.string().optional(),
  customer_phone: z.string().optional(),
  task_address: z.string(),
  task_date: z.string(),
  task_note: z.string().optional(),
  task_open_amount: z.string().optional(),
  task_priority: z.string().optional(),
  task_tags: z.string().array().optional(),
  task_type: z.string(),
});

const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_TOKEN ?? "", (error, decoded) => {
    if (error) {
      console.log(error);
      throw new Error("Token from google cloud function invalid");
    }
    return decoded;
  });

 async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Check inputs
    const input = schema.parse(req.body);
    //Check auth
    const token = req.headers.authorization
      ? { uid: verifyToken(req?.headers?.authorization) }
      : await hasAuth(req);
    //Make mutation
    const doc = await admin.firestore().collection("tasks").doc(input.id).get();
    const data = doc.data() as Task;
    if (data.task_owner === token.uid) {
      await admin
        .firestore()
        .collection("tasks")
        .doc(input.id)
        .update({
          ...(input.status && { status: input.status }),
          ...(input.customerName && { customerName: input.customerName }),
          ...(input.customer_mail && {customer_mail: input.customer_mail} ),
          ...(input.customer_mobile && {customer_mobile: input.customer_mobile} ),
          ...(input.customer_phone && {customer_phone: input.customer_phone} ),
          ...(input.task_address && {task_address: input.task_address} ),
          ...(input.task_date && {task_date: input.task_date} ),
          ...(input.task_note && {task_note: input.task_note} ),
          ...(input.task_open_amount && {task_open_amount: input.task_open_amount} ),
          ...(input.task_priority && {task_priority: input.task_priority} ),
          ...(input.task_tags && {task_tags: input.task_tags} ),
          ...(input.task_type && {task_type: input.task_type} ),
          updatedAt: dayjs().toISOString(),
        });
      res.status(200).json({ msg: "task successfully updated" });
    } else {
      res.status(400).json({ msg: "item not found" });
    }
  } catch (error) {
    errorLogger("BACKEND: Error updating task", error)
    res.status(400).json({ msg: "mutation was not successfull" });
  }
}

export default withSentry(handler)
