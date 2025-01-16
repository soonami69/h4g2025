"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./navbarStyles.css";
import NavLink from "./navLink";

export default function NavBar() {
    const { data: session } = useSession();
    const currentPath = usePathname();
    return (
        <nav className="navbar">
            {/* links */}
            <div className="navlinks">
                <NavLink
                    name="Dashboard"
                    link="/dashboard"
                    defaultColor="#CCB7E5"
                    hoverColor="#966FD6"
                />
                <NavLink
                    name="Meetings"
                    link="/meetings"
                    defaultColor="#FF6962"
                    hoverColor="#850101"
                />
                <NavLink
                    name="Emails"
                    link="/emails"
                    defaultColor="#FFEE8C"
                    hoverColor="#8B8000"
                />
            </div>

            <div className="profile">
                {session?.user ? (
                    <>
                        <img
                            src={session.user.image}
                            alt="Profile"
                            className="profileImage"
                        />
                    </>
                ) : (
                    <button
                        className="button"
                        onClick={() => signIn("google")}
                    >
                        Sign in!
                    </button>
                )}
            </div>
        </nav>
    );
}
