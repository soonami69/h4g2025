'use client'
import React from "react";
import { useState } from "react";

export default function EditPage({ params }) {
    const { id } = params;

    // TODO: HERE, A REQUEST SHOULD BE MADE TO THE BACKEND TO RETREIVE THE INFORMATION FOR THE EVENT
    const [ event, setEvent ] = useState(null);
    return (
        <div>
            <p>{id}</p>
        </div>
    );
}
