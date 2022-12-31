import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebaseServer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseClient";

export function withAuth(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    let userUid;
    try {
      const cookies = nookies.get(context);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid } = token;
      userUid = uid;
      if (uid) {
        const docRef = doc(db, "accounts", uid);
        const docSnap = await getDoc(docRef);
        if (
          !docSnap.exists() &&
          context.resolvedUrl.split("/")[1] !== "onboarding"
        ) {
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
