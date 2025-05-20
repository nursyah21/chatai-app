import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = process.env.FIREBASE_ADMIN_SDK!;

const app = initializeApp({
    credential: cert(serviceAccount)
});

const adminAuth = getAuth(app);

export { adminAuth };
