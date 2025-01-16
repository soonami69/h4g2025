"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import NavBar from "./components/navbar";
import "./globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ overflowX: "hidden", borderWidth: 0 }}>
                <SessionProvider>
                    {/* Main container for layout */}
                    <div className="flex flex-col min-h-screen overflow-x-hidden">
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
