"use client";
import "./ladderStyles.css"
import React, { useState } from "react";
import Link from "next/link";
import { Comic_Neue } from "next/font/google";

const comic = Comic_Neue({ weight: "400", subsets: ["latin"] });

function NavLadderStep({name, link, defaultColor, hoverColor}){
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="ladder-step"
            style={{ backgroundColor: isHovered ? hoverColor : defaultColor }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link className={comic.className} style={{ color: "black" }} href={link}>{name}</Link>
        </div>
    );
}

export default function Ladder() {
    return (
        <div className="ladder-container">
            <div className="ladder-leg"><h1> </h1></div>
            <div className="ladder-content">
                <NavLadderStep name="Assign Task" link="/tasks" defaultColor="#ffadad" hoverColor="#fa6e6e"/>
                <NavLadderStep name="Schedule Meeting" link="/meetings" defaultColor="#fdffb6" hoverColor="#f5f878"/>
                <NavLadderStep name="Summarise Email" link="/emails" defaultColor="#9bf6ff" hoverColor="#3fe8f8"/>
            </div>
            <div className="ladder-leg"><h1> </h1></div>
        </div>
    );
}