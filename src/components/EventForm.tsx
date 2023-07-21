"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

type Props = {
    change: Function
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
    const queryClient = useQueryClient()
    const eventMutation = useMutation({
        mutationFn: (newEvent: {}) => {
            return axios({
                url: "/api/entry",
                headers: {
                    "Content-type": "multipart/form-data"
                },
                method: "POST",
                data: newEvent
            })
        },
    })
    function createEvent(e: any) {
        const event = {
            title: e.target.title.value,
            startTime: (new Date(e.target.startTime.value)).toISOString(),
            endTime: (new Date(e.target.endTime.value)).toISOString(),
            notes: e.target.notes.value
        }
        eventMutation.mutate(event, {
            onSuccess: () => {
                let startDay = new Date(event["startTime"])
                startDay = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate())
                let endDay = new Date(event["endTime"])
                endDay = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate())
                queryClient.invalidateQueries([`date${startDay.toISOString()}`, `date${endDay.toISOString()}`])
            }
        })
    }
    return (
        <div className="self-center w-4/5">
            <form onSubmit={() => { createEvent(event); change(0) }} className="flex flex-col gap-5 w-full">
                <div>
                    <div className="text-right">title</div>
                    <input type="text" id="title" className="w-full p-1 rounded-md" />
                </div>
                <div>
                    <div className="text-right">start time</div>
                    <input type="datetime-local" id="startTime" className="w-full p-1 rounded-md" defaultValue={defaultStartTime()} />
                </div>
                <div>
                    <div className="text-right">end time</div>
                    <input type="datetime-local" id="endTime" className="w-full p-1 rounded-md" defaultValue={defaultEndTime()} />
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