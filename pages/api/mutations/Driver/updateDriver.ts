import { withSentry } from "@sentry/nextjs";
import dayjs from "dayjs";
import * as admin from "firebase-admin";
import * as jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { errorLogger } from "../../../../ErrorLogger/errorLogger";
import { Driver } from "../../../../src/types/Driver";
import hasAuth from "../../utils/hasAuth";

const schema = z.object({
    id: z.string(),
    driverName: z.string(),
    imageURL: z.string(),
    color: z.string(),
    employer: z.string(),
    vehicles: z.string().array(),
   
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
    const doc = await admin.firestore().collection("drivers").doc(input.id).get();
    const data = doc.data() as Driver;
    if (data.employer === token.uid) {
      await admin
        .firestore()
        .collection("drivers")
        .doc(input.id)
        .update({
          ...(input.driverName && { driverName: input.driverName }),
          ...(input.imageURL && { imageURL: input.imageURL }),
          ...(input.color && { color: input.color }),
          ...(input.vehicles && { vehicles: input.vehicles }),
          updatedAt: dayjs().toISOString(),
        });
      res.status(200).json({ msg: "driver successfully updated" });
    } else {
      res.status(400).json({ msg: "driver not found" });
    }
  } catch (error) {
    errorLogger("BACKEND: Error updating driver", error)
    res.status(400).json({ msg: "mutation was not successfull" });
  }
}

export default withSentry(handler)
