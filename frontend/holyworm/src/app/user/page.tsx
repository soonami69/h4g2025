"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "./userPageStyles.css";
import { Cabin } from "next/font/google";
import { useRouter } from "next/navigation";

const cabin = Cabin({ weight: "variable", style: "normal", subsets: ["latin"] });

const testData = {
    email: "timsoon02@gmail.com",
    name: "Timothy Soon",
    department: "HR",
    role: "Intern",
};

export default function UserPage() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = () => {
            setUserData(testData); // Simulate fetching user data
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value, // Dynamically update the department or role
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated User Data:", userData);
        // Add API call or logic here to save the updated user data
        alert("User data updated successfully!");
        router.push("/dashboard");
    };

    return (
        <div>
            {userData && session?.user ? (
                <div
                    style={{
                        alignItems: "center",
                        flex: 1,
                        display: "flex",
                        paddingTop: "30px",
                        flexDirection: "column",
                    }}
                >
                    <img
                        src={session.user.image}
                        alt="Profile"
                        className="bigImage"
                    />
                    <h1 className="name" style={{marginTop: "10px"}}>{session?.user?.name}</h1>
                    <p className="email">
                        <strong>Email:</strong> {userData.email}
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            className={`${cabin.className} formWrapper`}
                        >
                            <div
                                style={{
                                    marginBottom: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <label
                                    htmlFor="department"
                                    style={{ marginRight: "10px", marginBottom: "10px" }}
                                >
                                    Department:
                                </label>
                                <label
                                    htmlFor="role"
                                    style={{ marginRight: "10px", marginTop: "10px" }}
                                >
                                    Role:
                                </label>
                            </div>

                            <div
                                style={{
                                    marginBottom: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={userData.department}
                                    onChange={handleInputChange}
                                    style={{ padding: "5px", marginBottom: "10px" }}
                                />
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={userData.role}
                                    onChange={handleInputChange}
                                    style={{ padding: "5px" }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#96b6e4",
                                color: "white",
                                border: "none",
                                borderRadius: "15px",
                                cursor: "pointer",
                            }}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
