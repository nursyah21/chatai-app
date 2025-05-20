import { useRouter } from "next/navigation";

export default function useHooks() {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch("/api/auth/logout",);
        router.push("/login");
    };

    return { router, handleLogout }
}