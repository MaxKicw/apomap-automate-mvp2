
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../../utils/hasAuth";
import { Driver } from "../../../../src/types/Driver";
import { withSentry } from "@sentry/nextjs";
import { errorLogger } from "../../../../ErrorLogger/errorLogger";

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
    const doc = await admin.firestore().collection("drivers").doc(input.id).get();
    const data = doc.data() as Driver;
  
    if (data.employer !== token.uid) {
      throw new Error();
    }
    await admin.firestore().collection("drivers").doc(input.id).delete();
    res.status(200).json({ msg: "driver successfully deleted" });
  } catch (error) {
    errorLogger("BACKEND: Error deleting driver", error)
    res.status(400).json({ msg: "driver not found" });
  }
}

export default withSentry(handler)