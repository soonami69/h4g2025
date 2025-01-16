import React from "react";
import "./eventCard.css";

export default function EventCard({eventInfo}) {
    const { type, description } = eventInfo.event.extendedProps;
    return (
        <div onClick={() => console.log("pressed!")} className={(type === "meeting" ? "taskWrapper" : "meetingWrapper") + " mainWrapper"}>
            <strong>{eventInfo.timeText}</strong>
            <div>{eventInfo.event.title}</div>
            <div style={{ fontSize: "0.8em", color: "gray" }}>{description}</div>
            <div
                style={{
                    marginTop: "5px",
                    fontSize: "0.75em",
                    backgroundColor: type === "meeting" ? "#ffcccb" : "#9891B6",
                    color: type === "meeting" ? "black" : "white",
                    padding: "2px 5px",
                    borderRadius: "3px",
                }}
            >
                {type.toUpperCase()}
            </div>
        </div>
    );
}