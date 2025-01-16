"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./editPageStyles.css";

const trialData = {
    id: "1",
    title: "Complete React Project",
    description: "Finish building the task management module.",
    status: "incomplete", // "complete" or "incomplete"
    deadline: "2024-01-25T12:00",
    users: ["Jane Smith"], // Initially assigned users
};

export default function EditTaskPage({ params }) {
    const { id } = params;

    const [formData, setFormData] = useState(trialData);
    const [task, setTask] = useState(formData); // TODO: Replace with `null` and fetch actual backend data
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [assignedUsers, setAssignedUsers] = useState(trialData.users);

    /*
    // Fetch task data when the page loads
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`/api/tasks/${id}`); // Replace with actual API endpoint
                const data = await response.json();
                setTask(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    deadline: data.deadline,
                    users: data.users,
                });
            } catch (error) {
                console.error("Error fetching task data:", error);
            }
        };

        fetchTask();
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
            const response = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, users: assignedUsers }),
            });

            if (response.ok) {
                router.push(`/task/${id}`); // Redirect to task details
            } else {
                console.error("Error updating task");
            }
        } catch (error) {
            console.error("Error submitting task update:", error);
        }
    };

    // Display a loading message if the task data is not yet loaded
    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "20px", backgroundColor: "#B3EBF2", minHeight: "100vh" }}>
            <div className="editPageWrapper">
                <h1 style={{ color: "#333" }}>Edit Task</h1>
                <form
                    onSubmit={handleSubmit}
                    className="editForm"
                >
                    <div className="formGroup">
                        <label htmlFor="title">Title:</label>
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
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="deadline">Deadline:</label>
                        <input
                            type="datetime-local"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
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
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
}
