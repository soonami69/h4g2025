'use client'
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import React from "react";
import "./loginStyles.css";
import { Comic_Neue } from 'next/font/google';
import Image from "next/image";
import worm from "/Users/evedaktyl/Documents/h4g2025/frontend/holyworm/src/app/assets/worm.png"
import book from "/Users/evedaktyl/Documents/h4g2025/frontend/holyworm/src/app/assets/book2.png"

const comic = Comic_Neue({ weight: "400", subsets: ["latin"] });

export default function Login() {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    const handleGoogleSignIn = () => {
        // Trigger the Google sign-in using NextAuth
        signIn("google");
    };

    return (
        <div className="relative h-screen flex justify-center items-center">
  {/* Background Book Image */}
  <div className="absolute inset-0 -z-10 flex justify-center items-center ml-10">
    <Image
      src={book} // Replace `bookImage` with your book image import
      alt="Book Background"
      width={600}
      height={600}
      objectFit="contain" // Ensures the image scales properly within its container
    />
  </div>

  {/* Content Layered on Top */}
  <div className="text-center flex flex-col items-center">
    <Image src={worm} alt="Logo" width={350} height={350} className="mb-5" />
    <h1 className={`${comic.className} text-4xl font-bold text-black`}>
      Welcome to WonderWorm
    </h1>
    <h2 className="text-lg font-medium mt-2 text-black">
      Login to continue
    </h2>
    <GoogleButton onClick={handleGoogleSignIn} className="mt-8" />
  </div>
</div>
        
    );
}


