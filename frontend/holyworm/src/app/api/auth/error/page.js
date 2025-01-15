// app/api/auth/error/page.tsx
"use client"; // This ensures the page can use client-side logic like React hooks

import { useEffect } from "react";

export default function ErrorPage() {
    useEffect(() => {
        // Optionally, log error information or handle error status
        console.error("An error occurred during authentication.");
    }, []);

    return (
        <div>
            <h1>Authentication Error</h1>
            <p>Something went wrong while trying to authenticate. Please try again later.</p>
        </div>
    );
}
