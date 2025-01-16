"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import "./eventStyles.css";
import MeetingCard from "./component/MeetingCard";
import TaskCard from "./component/TaskCard";

export default function EventPage() {
    const [showUpcomingMeetings, setShowUpcomingMeetings] = useState(true);
    const [showUpcomingTasks, setShowUpcomingTasks] = useState(true);

    return (
        <div className="mainWrapper">
            <h1 className="headerText self-center">Here's a quick summary of what's happening!</h1>
            <div className="bodyWrapper">
                <div className="meetingBoxWrapper">
                    <div className="flex flex-row">
                        <button
                            className="meetingButtons"
                            disabled={showUpcomingMeetings}
                            onClick={() => {
                                setShowUpcomingMeetings(true);
                                {
                                    /* set logic here */
                                }
                            }}
                        >
                            Upcoming
                        </button>
                        <button
                            className="meetingButtons"
                            disabled={!showUpcomingMeetings}
                            onClick={() => {
                                setShowUpcomingMeetings(false);
                                {
                                    /* set logic here */
                                }
                            }}
                        >
                            Completed
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                            width: "100%",
                            flexDirection: "column",
                            justifyItems: "center",
                            alignItems: "center",
                        }}
                    >
                        <MeetingCard meetingTrial={"hi"} />
                    </div>
                </div>
                <div className="taskBoxWrapper">
                    <div className="flex flex-row">
                        <button
                            className="taskButtons"
                            disabled={showUpcomingTasks}
                            onClick={() => {
                                setShowUpcomingTasks(true);
                                {
                                    /* set logic here */
                                }
                            }}
                        >
                            Upcoming
                        </button>
                        <button
                            className="taskButtons"
                            disabled={!showUpcomingTasks}
                            onClick={() => {
                                setShowUpcomingTasks(false);
                                {
                                    /* set logic here */
                                }
                            }}
                        >
                            Completed
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                            width: "100%",
                            flexDirection: "column",
                            justifyItems: "center",
                            alignItems: "center",
                        }}
                    >
                        <TaskCard taskTrial={"hi"} />
                        <TaskCard taskTrial={"hi"} />
                        <TaskCard taskTrial={"hi"} />
                        <TaskCard taskTrial={"hi"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
