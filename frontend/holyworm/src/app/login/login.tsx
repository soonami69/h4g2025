'use client'
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import React from "react";

export default function Login() {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    const handleGoogleSignIn = () => {
        // Trigger the Google sign-in using NextAuth
        signIn("google");
    };

    return (
        <div>
            <h1>Login to Your Account</h1>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    );
}
