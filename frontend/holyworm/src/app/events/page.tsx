"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import "./eventStyles.css";
import MeetingCard from "./component/MeetingCard";
import TaskCard from "./component/TaskCard";
import axios from "axios";

const convertEmailToId = async (email) => {
    const res = await axios.get(`http://localhost:4000/users/email/${email}`, { withCredentials: true });
    if (res.data.success) {
        return res.data.data._id;
    }
};

export default function EventPage() {
    const { data: session, status } = useSession();
    const [showUpcomingMeetings, setShowUpcomingMeetings] = useState(true);
    const [showUpcomingTasks, setShowUpcomingTasks] = useState(true);
    const [events, setEvents] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var fetchedEvents = [];
            var fetchedTasks = [];

            const fetchMeetings = async (userId) => {
                const res = await axios.get(`http://localhost:4000/meetings/users/${userId}`, { withCredentials: true });
                if (res.data.success) {
                    fetchedEvents = res.data.data;
                    console.log(fetchedEvents);
                }
            };

            const fetchTasks = async (userId) => {
                const res = await axios.get(`http://localhost:4000/tasks/users/${userId}`, { withCredentials: true });
                if (res.data.success) {
                    fetchedTasks = res.data.data;
                    console.log(fetchedTasks);
                }
            };

            if (session?.user?.email) {
                const userId = await convertEmailToId(session.user.email);

                await fetchMeetings(userId);
                await fetchTasks(userId);

                const filteredEvents = fetchedEvents.filter(
                    (event) => (new Date(event.endTime) < new Date()) !== showUpcomingMeetings
                );
                setEvents(filteredEvents);

                const filteredTasks = fetchedTasks.filter((task) => (task.status == "completed") !== showUpcomingTasks);
                setTasks(filteredTasks);
            }
        };

        fetchData();
    }, [showUpcomingMeetings, showUpcomingTasks, session]);

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
                                    key={event._id}
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
                                    key={task._id}
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
