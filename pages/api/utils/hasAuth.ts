import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { NextApiRequest } from "next";
import { firebaseAdmin } from "../../../firebaseServer";

const hasAuth = async (req: NextApiRequest): Promise<DecodedIdToken> => {
  if (req.cookies.token) {
    return await firebaseAdmin.auth().verifyIdToken(req.cookies.token);
  } else {
    throw new Error("user not authenticated");
  }
};

export default hasAuth;
