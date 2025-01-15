"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {/* Wrapping everything inside the SessionProvider */}
                <SessionProvider>
                    {/* Layout UI - This is where you can add your layout */}
                    <main>{children}</main>
                </SessionProvider>
            </body>
        </html>
    );
}
