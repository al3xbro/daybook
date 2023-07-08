import React from 'react'

type Props = {
    date: Date
    viewingMonth: number
}

export default function Day({ date, viewingMonth }: Props) {
    return (
        <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 flex justify-center"}>
            <div className={`flex justify-center pt-2 w-1/4 h-1/4 rounded-full m-2 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                {date.getDate()}
            </div>
        </div>
    )
}