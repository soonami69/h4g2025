import React from "react";
import "./cardStyles.css";
import { Cabin } from "next/font/google";
import { useRouter } from "next/navigation";

const cabin = Cabin({ weight: "variable", style: "normal", subsets: ["latin"] });

const testData = {
    _id: "task123",
    title: "Submit Report",
    description: "Prepare and submit the monthly financial report.",
    status: "incomplete", // Try changing this to "complete" to test styling
    deadline: "2025-02-15T17:00:00Z",
    users: ["Alice Johnson", "Bob Smith"],
};

export default function TaskCard({ task }) {
    const router = useRouter();
    const { _id, title, description, status = "unknown", deadline, users = [] } = task;
    const startTimeDate = new Date(deadline); // recycled code that's why the variable name sucks
    const deadlineDateString = startTimeDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const deadlineTimeString = startTimeDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="taskCardWrapper">
            <h1 className="title">{title}</h1>
            <div className="flex flex-row">
                <div className="timeWrapper">
                    <p className={`${cabin.className} date`}>Status:</p>
                    <p className={`${cabin.className} time`}>Deadline:</p>
                    <p className={`${cabin.className} time`}>Description:</p>
                </div>
                <div className="flex-col t">
                    <p
                        className="dateString"
                        style={{
                            color: status === "incomplete" ? "#FF746C" : "grey",
                            fontWeight: status === "incomplete" ? "bold" : "normal",
                        }}
                    >
                        {status.toUpperCase()}
                    </p>
                    <p
                        className={`${cabin.className} deadlineString`}
                    >{`${deadlineTimeString} at ${deadlineDateString}`}</p>
                    <p className={`${cabin.className} deadlineString`}>{description}</p>
                </div>
            </div>
            <div className={`${cabin.className} peopleWrapper`}>
                <p>People:</p>
                {users.map((user) => (
                    <div>
                        <p className="font-normal">{`• ${user}`}</p>
                    </div>
                ))}
            </div>
            <div className="buttonWrapper flex w-auto flex-row justify-evenly">
                <button
                    onClick={() => {
                        router.push(`/edit/task/${task._id}`);
                    }}
                    className={`${cabin.className} editButtonTask`}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
