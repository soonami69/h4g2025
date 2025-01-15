"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import './globals.css';

export default function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Avoid redirect during loading
        if (session) {
            // Redirect to dashboard if user is signed in
            router.push("/dashboard");
        } else {
            // Redirect to sign-in page if user is not signed in
          router.push("/login");
        }
    }, [session, status, router]);

    return <div className="background">Loading...</div>; // Show loading state until the session is determined
}
