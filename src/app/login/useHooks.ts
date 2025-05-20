import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "@firebase/auth";
import { useRouter } from "next/navigation";

export default function useHooks() {
    const router = useRouter()

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const idToken = await userCredential.user.getIdToken();


            const response = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const data = await response.json();

            if (data.user) {
                router.push('/app')
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    return { router, handleGoogleLogin }
}