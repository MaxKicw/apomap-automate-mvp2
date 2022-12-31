import { auth } from "../../firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useAuth = () => {
  const signUp = (input: { email: string; password: string }) =>
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((creds) => {
        const user = creds.user;
        console.log("'SUCCES");
        console.log(user);
        return user;
      })
      .catch((err) => console.error("error", err));
  return { signUp };
};
