"use client";
import { useSession, signIn, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import "./dbStyles.css";
import Calendar from "./components/calendar";
import Ladder from "./components/ladder";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboardWrapper">
            <h1
                className={`dashboardWelcome ${montserrat.className}`}
                style={{ marginLeft: "20px", paddingBottom: "20px" }}
            >
                Welcome, {session?.user?.name}!
            </h1>
            <div style={{ justifyContent: "center"}}>
                <Calendar />
                <Ladder />
            </div>
        </div>
    );
}
