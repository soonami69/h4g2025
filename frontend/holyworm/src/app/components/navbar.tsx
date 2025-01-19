"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./navbarStyles.css";
import NavLink from "./navLink";
import { useRouter } from "next/navigation";
import worm from "../assets/worm.png";

export default function NavBar() {
    const { data: session } = useSession();
    const currentPath = usePathname();
    const router = useRouter();

    const routeToProfile = (email) => {
        router.push(`/user`);
    }
    return (
        <nav className="navbar">
            {/* logo */} 
            <div style={{width: 200}}>
                <Image src={worm} alt="Logo" width={60} height={60}></Image>
            </div>
            {/* links */}
            <div className="navlinks">
                <NavLink
                    name="Dashboard"
                    link="/dashboard"
                    defaultColor="#CCB7E5"
                    hoverColor="#966FD6"
                />
                <NavLink
                    name="Events"
                    link="/events"
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

            <div className="profile" style={{width:200, display: "flex", flexDirection: "row-reverse"}}>
                {session?.user ? (
                    <div onClick={() => routeToProfile(session?.user?.email)} className="flex flex-row items-center">
                        <p className="profileName mr-5">{session?.user?.name}</p>
                        <img
                            src={session.user.image}
                            alt="Profile"
                            className="profileImage"
                        />
                    </div>
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
