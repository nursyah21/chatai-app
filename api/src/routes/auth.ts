import { Hono } from "hono"
import { adminAuth } from "../lib/firebaseAdmin";

export const auth = new Hono()

auth.post('/auth/google', async (c) => {
    const { idToken } = await c.req.json()
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    .then(e=>{
        console.log(e)
    })
    .catch(e=>{
        console.log(e)
    });

    return c.json(idToken)
})