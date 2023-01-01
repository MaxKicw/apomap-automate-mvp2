// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import { firebaseAdmin } from "../../firebaseServer";

const schema = z.object({
  name: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.token) {
    res.status(400).json({ msg: "missing stuff" });
    return;
  }
  try {
    const input = schema.parse(req.body);
    const token = await firebaseAdmin.auth().verifyIdToken(req.cookies.token);
    await admin
      .firestore()
      .collection("names")
      .doc(token.uid)
      .set({ name: input.name });
    res.status(200).json({ msg: `Hi, ${input.name}` });
  } catch (error) {
    res.status(400).json({ msg: "missing stuff" });
  }
}
