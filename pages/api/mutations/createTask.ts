// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { errorLogger } from "../../../ErrorLogger/errorLogger";

const schema = z.object({
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //Check inputs
    const input = schema.parse(req.body);
    //Check auth
    const token = await hasAuth(req);
    //Make mutation
    const id = randomUUID();
    await admin.firestore().collection("tasks").doc(id).set({
      id,
      customerName: input.customerName,
      customer_mail: input.customer_mail,
      customer_mobile: input.customer_mobile,
      customer_phone: input.customer_phone,
      task_address: input.task_address,
      task_created: dayjs().toISOString(),
      task_job_no: "",
      task_latest: "",
      task_note: input.task_note,
      task_open_amount: input.task_open_amount,
      task_origin: token.uid,
      task_owner: token.uid,
      task_priority: input.task_priority ?? false,
      task_source: "ADG S3000",
      task_status: "unassigned",
      task_tags: input.task_tags,
      task_type: input.task_type ?? "delivery",
      task_date: input.task_date,
    });
    //Send response
    res.status(200).json(id);
  } catch (error) {
    errorLogger("BACKEND: Error creating new task", error);
    res.status(400).json({ msg: "couldn't create task" });
  }
};

export default withSentry(handler);

