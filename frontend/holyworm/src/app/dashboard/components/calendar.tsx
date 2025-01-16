import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendarStyles.css";
import EventCard from "./eventCard";

export default function Calendar() {
    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Team Meeting",
            start: "2025-01-20T10:00:00",
            end: "2025-01-20T11:00:00",
            extendedProps: {
                type: "meeting",
                description: "Discuss project updates.",
            },
        },
        {
            id: "2",
            title: "Task: Code Review",
            start: "2025-01-21T14:00:00",
            end: "2025-01-21T15:00:00",
            extendedProps: {
                type: "task",
                description: "Review PRs in the repository.",
            },
        },
    ]);

    return (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
                style={{
                    width: "80%",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    events={events}
                    height={600}
                    aspectRatio={2}
                    eventContent={(eventInfo) => <EventCard eventInfo={eventInfo}/> }
                    buttonText={{
                        today: "Today",
                        month: "Month",
                        week: "Week",
                        day: "Day",
                    }}
                    headerToolbar={{
                        left: "prev next today",
                        center: "title",
                        right: "dayGridMonth timeGridWeek timeGridDay",
                    }}
                />
            </div>
        </div>
    );
}
