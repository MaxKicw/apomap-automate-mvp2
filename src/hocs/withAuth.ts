import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebaseServer";
import { firestore } from "firebase-admin";

export function withAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    let userUid;
    try {
      console.log("checking");
      const cookies = nookies.get(context);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      console.log(token);
      const { uid } = token;
      console.log(uid);
      userUid = uid;
      if (uid) {
        const doc = await firestore().collection("accounts").doc(uid).get();
        if (!doc.exists && context.resolvedUrl.split("/")[1] !== "onboarding") {
          return {
            redirect: {
              destination: `/${context.locale}/onboarding`,
              statusCode: 302,
            },
          };
        }
      }
    } catch (err) {}
    if (!userUid) {
      // Redirect to login page
      return {
        redirect: {
          destination: `/${context.locale}/auth/sign-in`,
          statusCode: 302,
        },
      };
    }

    return await gssp(context); // Continue on to call `getServerSideProps` logic
  };
}
