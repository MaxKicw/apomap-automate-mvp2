// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { withSentry } from "@sentry/nextjs";
import { errorLogger } from "../../../ErrorLogger/errorLogger";

const schema = z.object({
  businessName: z.string(),
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
    const doc = await admin
      .firestore()
      .collection("accounts")
      .doc(token.uid)
      .set({
        id: token.uid,
        businessName: input.businessName,
      });
    //Send response
    res.status(200).json({ msg: doc });
  } catch (error) {
    errorLogger("BACKEND: Error creating new account", error)
    res.status(400).json({ msg: "mutation was not successfull" });
  }
}

export default withSentry(handler)