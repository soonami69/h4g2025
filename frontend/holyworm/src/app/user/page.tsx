'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "./userPageStyles.css";

const testData = {
    email: "timsoon02@gmail.com",
    name: "timothy soon",
    department: "HR",
    role: "Intern",
};

export default function UserPage() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const email = session?.user?.email;
        const fetchUserData = () => {
            setUserData(testData);
        };

        fetchUserData();
    }, []);

    return (
        <div>  
            {userData && session?.user ? (
                <div style={{alignItems: "center", flex: 1, display: "flex", paddingTop: "30px", flexDirection: "column"}}>
                    <img src={session.user.image} alt="Profile" className="bigImage" />
                    <h1 className="name">{session?.user?.name}</h1>
                    
                </div>
            ) : (<p>Loading user data...</p>)}
        </div>
    )
}