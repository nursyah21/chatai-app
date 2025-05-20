import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from './firebase.json';

const app = getApps().length ? getApp() : initializeApp({
    credential: cert(JSON.stringify(serviceAccount))
});

const adminAuth = getAuth(app);

export { adminAuth };