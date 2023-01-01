// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { z } from "zod";
import hasAuth from "../utils/hasAuth";
import { randomUUID } from "crypto";

const schema = z.object({
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
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
    const id = randomUUID();
    const doc = await admin
      .firestore()
      .collection("tasks")
      .doc(id)
      .set({
        customerName: input.name,
        id,
        owner: token.uid,
        coords: { lat: input.lat, lon: input.lon },
      });
    //Send response
    res.status(200).json({ msg: doc });
  } catch (error) {
    res.status(400).json({ msg: "mutation was not successfull" });
  }
}
