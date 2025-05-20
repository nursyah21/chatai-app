import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return Response.json({ user: userCredential.user });
    } catch {
        return Response.json({ error: "An unknown error occurred" }, { status: 400 });
    }
}
