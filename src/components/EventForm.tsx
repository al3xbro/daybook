"use client"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

type Props = {
    change: Function
}

function createEvent(e: any) {
    alert(e.target.title.value)
}

function defaultStartTime() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().substring(0, 16)
}

function defaultEndTime() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset() + 60)
    return date.toISOString().substring(0, 16)
}

export default function EventForm({ change }: Props) {
    return (
        <div className="self-center w-4/5">
            <form onSubmit={() => { createEvent(event); change(0) }} className="flex flex-col gap-5 w-full">
                <div>
                    <div className="text-right">title</div>
                    <input type="text" id="title" className="w-full p-1 rounded-md" />
                </div>
                <div>
                    <div className="text-right">start time</div>
                    <input type="datetime-local" id="startTime" className="w-full p-1 rounded-md" value={defaultStartTime()} />
                </div>
                <div>
                    <div className="text-right">end time</div>
                    <input type="datetime-local" id="endTime" className="w-full p-1 rounded-md" value={defaultEndTime()} />
                </div>
                <div>
                    <div className="text-right">notes</div>
                    <textarea id="notes" className="w-full p-1 rounded-md"></textarea>
                </div>
                <div className="flex flex-row gap-3">
                    <input type="submit" className="ui-button flex-1 bg-blue-200" />
                    <button className="ui-button flex-1" onClick={() => change(0)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}