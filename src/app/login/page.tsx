"use client"
import { BiGoogle } from "@/components/icons/bigoogle";
import { Button } from "@/components/ui/button";
import useHooks from "./useHooks";

export default function Home() {
  const { handleGoogleLogin } = useHooks()

  return (
    <div className="container mx-auto">
      <div className="h-screen items-center flex justify-center">
        <Button onClick={handleGoogleLogin}><BiGoogle /> Continue With Google</Button>
      </div>
    </div>
  );
}
