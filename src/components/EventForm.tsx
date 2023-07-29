"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

type Props = {
    change: Function
}

export default function EventForm({ change }: Props) {

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
    function createEvent(e: any) {
        const event = {

        }

        console.log(event)

        eventMutation.mutate(event, {
            onSuccess: () => {
                queryClient.invalidateQueries([`date${startDay.toISOString()}`, `date${endDay.toISOString()}`])
            }
        })
    }

    return (
        <div className="self-center w-4/5">

        </div>
    )
}