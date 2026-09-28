import "server-only";

import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export function isFirebaseAdminConfigured() {
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}

function getAdminApp() {
  if (getApps().length) return getApps()[0];
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const bucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (isFirebaseAdminConfigured()) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      storageBucket: bucket,
    });
  }

  if (process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.FIRESTORE_EMULATOR_HOST) {
    return initializeApp({ credential: applicationDefault(), projectId: projectId || "momently-demo", storageBucket: bucket || "momently-demo.appspot.com" });
  }

  throw new Error("Firebase Admin no está configurado. Revisa FIREBASE_SETUP.md y las variables de entorno.");
}

export const getAdminAuth = () => getAuth(getAdminApp());
export const getAdminDb = () => getFirestore(getAdminApp());
export const getAdminStorage = () => getStorage(getAdminApp());
