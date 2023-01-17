import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../../utils/hasAuth";
import { randomUUID } from "crypto";
import { errorLogger } from "../../../../ErrorLogger/errorLogger";

const schema = z.object({
  driverName: z.string(),
  color: z.string(),
  employer: z.string(),
  vehicles: z.string().array(),
 
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //Check inputs
    const input = schema.parse(req.body);
    //Check auth
    const token = await hasAuth(req);
    //Make mutation
    const id = randomUUID();
    await admin.firestore().collection("drivers").doc(id).set({
      driverName: input.driverName,
      id,
      employer: token.uid,
      color: input.color,
      vehicles: input.vehicles
    });

    //Send response
    res.status(200).json(id);
  } catch (error) {
    errorLogger("BACKEND: Error creating new driver", error);
    res.status(400).json({ msg: "couldn't create driver" });
  }
};

export default withSentry(handler);
