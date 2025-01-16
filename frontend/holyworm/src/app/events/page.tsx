"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "./eventStyles.css";
import MeetingCard from "./component/MeetingCard";
import TaskCard from "./component/TaskCard";

export default function EventPage() {
    const [showUpcomingMeetings, setShowUpcomingMeetings] = useState(true);
    const [showUpcomingTasks, setShowUpcomingTasks] = useState(true);
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Mock data fetching for events
        const fetchedEvents = [
            { id: 1, title: "Team Meeting", date: "2025-01-18", completed: false },
            { id: 2, title: "Project Update", date: "2025-01-15", completed: true },
        ];
        const filteredEvents = fetchedEvents.filter(
            (event) => event.completed !== showUpcomingMeetings
        );
        setEvents(filteredEvents);
    }, [showUpcomingMeetings]);

    useEffect(() => {
        // Mock data fetching for tasks
        const fetchedTasks = [
            { id: 1, title: "Finish Report", deadline: "2025-01-20", completed: false },
            { id: 2, title: "Submit Proposal", deadline: "2025-01-10", completed: true },
        ];
        const filteredTasks = fetchedTasks.filter((task) => task.completed !== showUpcomingTasks);
        setTasks(filteredTasks);
    }, [showUpcomingTasks]);

    return (
        <div className="mainWrapper">
            <h1 className="headerText self-center">Here's a quick summary of what's happening!</h1>
            <div className="bodyWrapper">
                {/* Meetings Section */}
                <div className="meetingBoxWrapper">
                    <div className="flex flex-row">
                        <button
                            className="meetingButtons"
                            disabled={showUpcomingMeetings}
                            onClick={() => setShowUpcomingMeetings(true)}
                        >
                            Upcoming
                        </button>
                        <button
                            className="meetingButtons"
                            disabled={!showUpcomingMeetings}
                            onClick={() => setShowUpcomingMeetings(false)}
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
                        {events.length > 0 ? (
                            events.map((event) => (
                                <MeetingCard
                                    key={event.id}
                                    meeting={event}
                                />
                            ))
                        ) : (
                            <p>No {showUpcomingMeetings ? "upcoming" : "completed"} meetings.</p>
                        )}
                    </div>
                </div>

                {/* Tasks Section */}
                <div className="taskBoxWrapper">
                    <div className="flex flex-row">
                        <button
                            className="taskButtons"
                            disabled={showUpcomingTasks}
                            onClick={() => setShowUpcomingTasks(true)}
                        >
                            Upcoming
                        </button>
                        <button
                            className="taskButtons"
                            disabled={!showUpcomingTasks}
                            onClick={() => setShowUpcomingTasks(false)}
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
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                />
                            ))
                        ) : (
                            <p>No {showUpcomingTasks ? "upcoming" : "completed"} tasks.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
