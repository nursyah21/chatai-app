import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FIREBASE_ADMIN_SDK } from "./env";

const serviceAccount = FIREBASE_ADMIN_SDK;

const app = getApps().length ? getApp() : initializeApp({
    credential: cert(serviceAccount)
});

const adminAuth = getAuth(app);

export { adminAuth };
