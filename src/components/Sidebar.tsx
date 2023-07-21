"use client"

import EventForm from "./EventForm"
import Todoform from "./TodoForm"
import { useState } from "react"

export default function Sidebar() {
    // visible state for forms and buttons
    const [formVisible, changeVisible] = useState(0)

    return (
        <div className="flex flex-col w-1/6 pt-10 bg-gray-300 mt-16 gap-5">
            {formVisible !== 0 ? null : <button className="self-center ui-button" onClick={() => { changeVisible(1) }}>Create Event</button>}
            {formVisible !== 0 ? null : <button className="self-center ui-button" onClick={() => { changeVisible(2) }}>Create Todo</button>}
            {formVisible === 1 ? <EventForm change={changeVisible} /> : null}
            {formVisible === 2 ? <Todoform change={changeVisible} /> : null}
        </div>
    )
}