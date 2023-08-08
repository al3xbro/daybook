"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import axios from "axios"

type Props = {
    change: Function
}

interface reminderData {
    title: string,
    notes: string,
    repeatOn: string,
    date: string,
    startTime: string,
    endTime: string,
    day: number
}

export default function ReminderForm({ change }: Props) {

    // defines useForm
    const now = new Date()
    const form = useForm<reminderData>({
        defaultValues: {
            title: "",
            notes: "",
            repeatOn: "none",
            date: `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${("0" + now.getDate()).slice(-2)}`,
            startTime: `${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}`,
            endTime: "",
            day: 0
        }
    })
    const { register, handleSubmit, setValue, formState, getValues } = form
    const { errors } = formState

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

    // creates reminder using useMutation.mutate()
    function createEvent(event: reminderData) {
        event.day = (new Date(parseInt(event.date.substring(0, 4)), parseInt(event.date.substring(5, 7)) - 1, parseInt(event.date.substring(8, 10)))).getDay() + 1
        event.date = event.date.substring(0, 4) + ("0" + parseInt(event.date.substring(5, 7))).slice(-2) + ("0" + event.date.substring(8, 10)).slice(-2)
        event.startTime = event.startTime.substring(0, 2) + event.startTime.substring(3, 5)
        event.endTime = ""
        console.log(event)
        eventMutation.mutate(event, {
            onSuccess: () => {
                queryClient.invalidateQueries([]) // TODO
            }
        })
        change(0)
    }

    return (
        <div className="self-center w-4/5">
            <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit(createEvent)} noValidate>
                <div>
                    <div>title</div>
                    <input type="text" id="title" className="w-full p-1 rounded-md" {...register("title", { required: "required" })} />
                    <div className="absolute text-sm text-red-500">{errors.title?.message}</div>
                </div>
                <div>
                    <div>date</div>
                    <input type="date" id="date" className="w-full p-1 rounded-md" {...register("date", {
                        required: {
                            value: true,
                            message: "required"
                        },
                    })} />
                    <div className="absolute text-sm text-red-500">{errors.date?.message}</div>
                </div>
                <div>
                    <div>deadline</div>
                    <input type="time" id="startTime" className="w-fit p-1 rounded-md" {...register("startTime", {
                        required: {
                            value: true,
                            message: "required"
                        }
                    }
                    )} />
                    <div className="absolute text-sm text-red-500">{errors.startTime?.message}</div>
                </div>
                <div>
                    <div>notes</div>
                    <textarea id="notes" className="w-full p-1 rounded-md" {...register("notes")}></textarea>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div>repeat on</div>
                        <div className="select-none text-sm  text-gray-400" onClick={() => {
                            const elements = document.getElementsByTagName("input")
                            setValue("repeatOn", "none")
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