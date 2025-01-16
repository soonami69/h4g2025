import React from "react";
import "./cardStyles.css";
import { Cabin } from "next/font/google";
import { useRouter } from "next/navigation";

const cabin = Cabin({ weight: "variable", style: "normal", subsets: ["latin"] });

export default function TaskCard({ taskTrial }) {
    const router = useRouter();
    const task = {
        _id: "6788910bda5f0596fa9eaa62",
        title: "Sample Task",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "incomplete",
        deadline: "2023-12-31T23:59:59.000Z",
        users: ["67889050da5f0596fa9eaa59"],
        __v: 0,
    };
    const { _id, title, description, status, deadline, users } = task;
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
