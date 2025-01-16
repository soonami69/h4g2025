import React from "react";
import { useState } from "react";
import Link from "next/link";
import "./navbarStyles.css";
import { Comic_Neue } from "next/font/google";

const comic = Comic_Neue({ weight: "400", subsets: ["latin"] });

export default function NavLink({
    name,
    link,
    defaultColor,
    hoverColor,
}: {
    name: string;
    link: string;
    defaultColor: string;
    hoverColor: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="linkWrapper"
            style={{ backgroundColor: isHovered ? hoverColor : defaultColor }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link className={comic.className} style={{ color: "black" }} href={link}>{name}</Link>
        </div>
    );
}
