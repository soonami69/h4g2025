'use client'
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import React from "react";
import "./loginStyles.css";
import { Comic_Neue } from 'next/font/google';

const comic = Comic_Neue({ weight: "400", subsets: ["latin"] });

export default function Login() {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    const handleGoogleSignIn = () => {
        // Trigger the Google sign-in using NextAuth
        signIn("google");
    };

    return (
        <div className="body">
            <h1 className={comic.className}>Login to Your Account</h1>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    );
}


