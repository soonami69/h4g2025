"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./editPageStyles.css";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";

const trialData = {
    id: "1",
    title: "Team Sync",
    startTime: "2024-01-25T10:00",
    endTime: "2024-01-25T11:00",
    location: "Conference Room A",
    users: ["Jane Smith"], // Initially assigned users
};

export default function EditMeetingPage({ params }) {
    const { id } = params;

    const [formData, setFormData] = useState(trialData);
    const [meeting, setMeeting] = useState(formData); // TODO: Replace with `null` and fetch actual backend data
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [assignedUsers, setAssignedUsers] = useState(trialData.users);

    /*
    // Fetch meeting data when the page loads
    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const response = await fetch(`/api/meetings/${id}`); // Replace with actual API endpoint
                const data = await response.json();
                setMeeting(data);
                setFormData({
                    title: data.title,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    location: data.location,
                    users: data.users,
                });
            } catch (error) {
                console.error("Error fetching meeting data:", error);
            }
        };

        fetchMeeting();
    }, [id]);
    */

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Search for users
    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() !== "") {
            try {
                const response = await fetch(`/api/users?search=${term}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching user search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    // Add a user to the assigned list
    const handleAddUser = (user) => {
        if (!assignedUsers.includes(user)) {
            setAssignedUsers((prev) => [...prev, user]);
        }
        setSearchTerm(""); // Clear search input
        setSearchResults([]); // Clear search results
    };

    // Remove a user from the assigned list
    const handleRemoveUser = (user) => {
        setAssignedUsers((prev) => prev.filter((u) => u !== user));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/meetings/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, users: assignedUsers }),
            });

            if (response.ok) {
                router.push(`/meeting/${id}`); // Redirect to meeting details
            } else {
                console.error("Error updating meeting");
            }
        } catch (error) {
            console.error("Error submitting meeting update:", error);
        }
    };

    // Display a loading message if the meeting data is not yet loaded
    if (!meeting) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "20px", backgroundColor: "#B3EBF2", minHeight: "100vh" }}>
            <div className="editPageWrapper">
                <h1 style={{ color: "#333" }}>Edit Meeting</h1>
                <form
                    onSubmit={handleSubmit}
                    className="editForm"
                >
                    <div className="formGroup">
                        <label htmlFor="title">Meeting Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <DatePicker
                            label="Start Time"
                            value={formData.startTime}
                            onChange={(newValue) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    startTime: newValue,
                                }));
                            }}
                        />
                    </div>
                    <div className="formGroup">
                        <DatePicker
                            label="End Time"
                            value={formData.endTime}
                            onChange={(newValue) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    startTime: newValue,
                                }));
                            }}
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label>Assigned Users:</label>
                        <ul>
                            {assignedUsers.map((user) => (
                                <li key={user}>
                                    {user}{" "}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveUser(user)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Search for users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <ul>
                            {searchResults.map((user) => (
                                <li key={user}>
                                    {user}{" "}
                                    <button
                                        type="button"
                                        onClick={() => handleAddUser(user)}
                                    >
                                        Add
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="submitButton"
                    >
                        Update Meeting
                    </button>
                </form>
            </div>
        </div>
    );
}
