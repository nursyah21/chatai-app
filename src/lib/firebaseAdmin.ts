import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = process.env.FIREBASE_ADMIN_SDK!;

const app = getApps().length ? getApp() : initializeApp({
    credential: cert(serviceAccount)
});

const adminAuth = getAuth(app);

export { adminAuth };
