import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PID,
  storageBucket: process.env.FIREBASE_SB,
  messagingSenderId: process.env.FIREBASE_SID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MID,
};

firebase.initializeApp(config);
export default firebase;
