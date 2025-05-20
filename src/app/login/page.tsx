"use client"
import Google from "@/assets/brand-google.svg";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "@firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
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

  return (
    <div className="container mx-auto">
      <div className="h-screen items-center flex justify-center">
        <Button onClick={handleGoogleLogin}><Image src={Google} alt="google" /> Continue With Google</Button>
      </div>
    </div>
  );
}
