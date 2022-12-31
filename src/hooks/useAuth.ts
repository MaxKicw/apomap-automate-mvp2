import nookies from "nookies";
import { auth } from "../../firebaseClient";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  deleteUser as firebaseDeleteUser,
} from "firebase/auth";

import { Store } from "../types/Store";
import { NextRouter } from "next/router";

export const useAuth = ({
  store,
  router,
}: {
  store?: Store;
  router?: NextRouter;
}) => {
  //Setsup a listener to delete token on server
  const setAuthListener = () => {
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        store?.setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        store?.setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  };
  //Refreshes Token after every 10minutes
  const refreshToken = () =>
    setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
  //Signup
  const signUp = (input: { email: string; password: string }) =>
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((creds) => {
        const user = creds.user;
        return user;
      })
      .catch((err) => console.error("error", err));
  //SignIn
  const signIn = (input: { email: string; password: string }) => {
    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((creds) => {
        const user = creds.user;
        store?.setUser(user);
        router?.replace("/dashboard");
      })
      .catch((err) => console.error("error", err));
  };
  //SignOut
  const signOut = (successRoute?: string) =>
    firebaseSignOut(auth)
      .then(() => {
        if (successRoute && router) {
          router.replace(successRoute);
        }
      })
      .catch((err) => console.error("error", err));
  //Delete User
  const deleteUser = (successRoute: string) => {
    console.log(auth.currentUser);
    if (auth.currentUser)
      firebaseDeleteUser(auth.currentUser)
        .then(() => router?.replace(successRoute))
        .catch((err) => console.error("error", err));
  };
  return { signUp, signIn, signOut, deleteUser, setAuthListener, refreshToken };
};
