"use client";
import React, { useEffect, useRef, useState } from "react";
import "./cardStyles.css";
import { Cabin } from "next/font/google";
import { useRouter } from "next/navigation";

const cabin = Cabin({ weight: "variable", style: "normal", subsets: ["latin"] });

const testData = {
    description: "Discuss the roadmap for Q1 2025.",
    _id: "12345",
    title: "Quarterly Planning Meeting",
    startTime: "2025-02-01T10:00:00Z",
    endTime: "2025-02-01T12:00:00Z",
    location: "Meeting Room 1",
    users: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
};

export default function MeetingCard({ meeting = testData }) {
    const router = useRouter();
    const { description, _id, title, startTime, endTime, location, users=[] } = meeting;
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
