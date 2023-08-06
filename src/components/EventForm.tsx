"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import axios from "axios"

type Props = {
    change: Function
}

type eventData = {
    title: string,
    notes: string,
    repeatOn: string,
    date: string,
    startTime: string,
    endTime: string,
}

export default function EventForm({ change }: Props) {

    // defines useForm
    const form = useForm<eventData>()
    const { register, handleSubmit } = form

    // defines useMutation
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

    // creates event using useMutation.mutate()
    function createEvent(event: eventData) {

        console.log(event)
        eventMutation.mutate(event, {
            onSuccess: () => {
                queryClient.invalidateQueries([]) // TODO
            }
        })
    }

    return (
        <div className="self-center w-4/5">
            <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(createEvent)}>
                <div>
                    <div>title</div>
                    <input type="text" id="title" className="w-full p-1 rounded-md" {...register("title")} />
                </div>
                <div>
                    <div>date</div>
                    <input type="date" id="date" className="w-full p-1 rounded-md" {...register("date")} />
                </div>
                <div>
                    <div>start time</div>
                    <input type="time" id="startTime" className="w-fit p-1 rounded-md" {...register("startTime")} />
                </div>
                <div>
                    <div>end time</div>
                    <input type="time" id="endTime" className="w-fit p-1 rounded-md" {...register("endTime")} />
                </div>
                <div>
                    <div>notes</div>
                    <textarea id="notes" className="w-full p-1 rounded-md" {...register("notes")}></textarea>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div>repeat on</div>
                        <div className="select-none" onClick={() => {
                            const elements = document.getElementsByTagName("input")
                            for (let i = 0; i < elements.length; i++) {
                                if (elements[i].type === "radio") {
                                    elements[i].checked = false
                                }
                            }
                        }}>clear</div>
                    </div>
                    <div className="flex w-full flex-col">
                        <div className="flex gap-1">
                            <input type="radio" id="daily" value="daily" {...register("repeatOn")} />
                            <label htmlFor="daily">Daily</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" id="weekly" value="weekly" {...register("repeatOn")} />
                            <label htmlFor="weekly">Weekly</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" id="monthly" value="monthly" {...register("repeatOn")} />
                            <label htmlFor="monthly">Monthly</label>
                        </div>
                        <div className="flex gap-1">
                            <input type="radio" id="yearly" value="yearly" {...register("repeatOn")} />
                            <label htmlFor="yearly">Yearly</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <button type="submit" className="ui-button flex-1">Submit</button>
                    <div className="ui-button flex-1" onClick={() => change(0)}>Cancel</div>
                </div>
            </form>

        </div>
    )
}