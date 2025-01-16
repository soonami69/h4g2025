"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import NavBar from "./components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const layoutStyle = {
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full height of the viewport
    };

    const contentStyle = {
        display: "flex",
        flex: 1, // Grow to fill remaining space
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    };

    return (
        <html lang="en">
            <body style={{ overflowX: "hidden", borderWidth: 0 }}>
                <SessionProvider>
                    {/* Main container for layout */}
                    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
                        {/* Navbar at the top */}
                        <header>
                            <NavBar />
                        </header>

                        {/* Main content */}
                        <main>{children}</main>
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
