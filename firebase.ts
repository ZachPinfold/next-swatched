import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
}

// export const auth = app.auth();
// export const fireStore = app.firestore();
// export const db = app.database();

export default app;
