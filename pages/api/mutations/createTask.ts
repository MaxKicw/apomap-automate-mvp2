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
  lat: z.number(),
  lon: z.number(),
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
      customerName: input.customerName,
      id,
      owner: token.uid,
      status: "unassigned",
      coords: { lat: input.lat, lon: input.lon },
      createdAt: dayjs().toISOString(),
    });
    //Send response
    res.status(200).json(id);
  } catch (error) {
    errorLogger("BACKEND: Error creating new task", error);
    res.status(400).json({ msg: "couldn't create task" });
  }
};

export default withSentry(handler);
