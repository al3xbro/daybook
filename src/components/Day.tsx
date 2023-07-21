import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
    date: Date
    viewingMonth: number
}

export default function Day({ date, viewingMonth }: Props) {
    const query = useQuery({
        queryKey: [`date${date.toISOString()}`],
        queryFn: async () => {
            return axios.get(`/api/entry?date=${date}`)
        },
    })
    const events = query.data?.data
    if (query.isError) {
        return (
            <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 flex justify-center select-none"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    bruh
                </div>
            </div>
        )
    }
    if (query.isLoading) {
        return (
            <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 flex justify-center select-none"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    loading
                </div>
            </div>
        )
    }
    return (
        <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 flex justify-center select-none"}>
            <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                {date.getDate()}
                {JSON.stringify(events)}
            </div>
        </div>
    )
}