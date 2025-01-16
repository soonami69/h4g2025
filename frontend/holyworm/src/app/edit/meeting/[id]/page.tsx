"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./editPageStyles.css";

const trialData = {
    id: "1",
    title: "Prepare Presentation",
    description: "Create slides for the quarterly meeting.",
    status: "incomplete",
    deadline: "2023-12-20T17:00",
    users: ["John Doe", "Jane Smith"], // Initially assigned users
};

export default function EditTaskPage({ params }) {
    const { id } = params;

    const [formData, setFormData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const router = useRouter();

    // Fetch users from the database based on the search term
    const fetchUsers = async (query) => {
        try {
            const response = await fetch(`/api/users?search=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error("Error fetching users:", response.statusText);
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error during user search:", error);
            setSearchResults([]);
        }
    };

    // Trigger search request when the search term changes
    useEffect(() => {
        if (searchTerm.trim()) {
            fetchUsers(searchTerm);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddUser = (user) => {
        setFormData((prevState) => ({
            ...prevState,
            users: [...prevState.users, user],
        }));
        setSearchTerm(""); // Clear the search bar after adding
        setSearchResults([]); // Clear search results
    };

    const handleRemoveUser = (user) => {
        setFormData((prevState) => ({
            ...prevState,
            users: prevState.users.filter((u) => u !== user),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push(`/task/${id}`);
            } else {
                console.error("Error updating task");
            }
        } catch (error) {
            console.error("Error submitting task update:", error);
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#B4DD1E", height: "100vh" }}>
            <div className="editPageWrapper">
                <h1>Edit Task</h1>
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
                        <label htmlFor="users">Assigned Users:</label>
                        <div className="assignedUsers">
                            {formData.users.map((user) => (
                                <div
                                    key={user}
                                    className="userChip"
                                >
                                    <span>{user}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveUser(user)}
                                        className="removeUserButton"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Search and add users"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="searchInput"
                        />
                        {searchResults.length > 0 && (
                            <ul className="dropdownList">
                                {searchResults.map((user) => (
                                    <li
                                        key={user.id}
                                        onClick={() => handleAddUser(user.name)}
                                        className="dropdownItem"
                                    >
                                        {user.name}
                                    </li>
                                ))}
                            </ul>
                        )}
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
