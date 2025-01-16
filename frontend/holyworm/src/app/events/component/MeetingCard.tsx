"use client";
import React, { useEffect, useRef, useState } from "react";
import "./cardStyles.css";
import { Cabin } from "next/font/google";
import { useRouter } from "next/navigation";

const cabin = Cabin({ weight: "variable", style: "normal", subsets: ["latin"] });

export default function MeetingCard({ meetingTrial }) {
    const router = useRouter();
    const meeting = {
        description: "",
        _id: "67889160da5f0596fa9eaa66",
        title: "Project Kickoff Meeting",
        startTime: "2023-11-01T10:00:00.000Z",
        endTime: "2023-11-01T11:00:00.000Z",
        location: "Conference Room A",
        users: ["67889050da5f0596fa9eaa59", "67889058da5f0596fa9eaa5c"],
    };
    const { description, _id, title, startTime, endTime, location, users } = meeting;
    const startTimeDate = new Date(startTime);
    const startDateString = startTimeDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const startTimeString = startTimeDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
    const endTimeString = new Date(endTime).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="meetingCardWrapper">
            <h1 className="title">{title}</h1>
            <div className="flex flex-row">
                <div className="timeWrapper">
                    <p className={`${cabin.className} date`}>Date:</p>
                    <p className={`${cabin.className} time`}>Start:</p>
                    <p className={`${cabin.className} time`}>End:</p>
                </div>
                <div className="flex-col t">
                    <p className="dateString">{startDateString}</p>
                    <p className="timeString">{startTimeString}</p>
                    <p className="timeString">{endTimeString}</p>
                </div>
            </div>
            <div className={`${cabin.className} peopleWrapper`}>
                <p>People:</p>
                {users.map((user) => (
                    <div key={user}>
                        <p className="font-normal">{`• ${user}`}</p>
                    </div>
                ))}
            </div>
            <div className="buttonWrapper flex w-auto flex-row justify-evenly">
                <button
                    onClick={() => {
                        router.push(`/edit/meeting/${meeting._id}`);
                    }}
                    className={`${cabin.className} editButton`}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}
