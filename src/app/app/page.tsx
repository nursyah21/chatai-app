"use client"

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout",);
    router.push("/login");
  };

  return (
    <div className="container mx-auto">
      <div className="h-screen items-center flex justify-center">
        Welcome
        <Button onClick={handleLogout}><LogOut /> Logout</Button>
      </div>
    </div>
  );
}
