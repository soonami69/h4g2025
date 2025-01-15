'use client'
import { useSession, signIn, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/auth/login");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div>
            Loading...
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>{session?.user?.name}</p>
            </div>
    );
}