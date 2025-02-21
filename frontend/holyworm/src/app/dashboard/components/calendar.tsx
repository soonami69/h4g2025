import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendarStyles.css";
import EventCard from "./eventCard";
import { useRouter } from "next/navigation";

export default function Calendar() {
    const [modalStyle, setModalStyle] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);

    // TODO: REPLACE WITH USE EFFECT API CALL TO OBTAIN EVENTS
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

    const handleEventClick = (clickInfo) => {
        // Get event click position
        const rect = clickInfo.el.getBoundingClientRect();

        // Dynamically position the modal as a "speech bubble"
        setModalStyle({
            top: rect.top + window.scrollY + rect.height + 10, // Below the event
            left: rect.left + window.scrollX, // Align left to event
        });

        setSelectedEvent(clickInfo.event);
    };

    const router = useRouter();

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const editModal = () => {
        router.push(`/edit/${selectedEvent.extendedProps.type}/${selectedEvent.id}`);
    }

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
                    events={events}
                    height={600}
                    aspectRatio={2}
                    eventContent={(eventInfo) => <EventCard eventInfo={eventInfo} />}
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
                    eventClick={handleEventClick}
                />
                {selectedEvent && (
                    <div
                        className="custom-modal"
                        style={modalStyle}
                    >
                        <div className="modal-content">
                            <h3>{selectedEvent.title}</h3>
                            <p className="modal-body">
                                <strong>Time:</strong> {selectedEvent.start.toLocaleString()}
                            </p>
                            <p className="modal-body">
                                <strong>Description:</strong>{" "}
                                {selectedEvent.extendedProps.description}
                            </p>
                            <p className="modal-body">
                                <strong>Type:</strong>{" "}
                                {selectedEvent.extendedProps.type.toUpperCase()}
                            </p>
                            <button onClick={editModal}>Edit</button>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
