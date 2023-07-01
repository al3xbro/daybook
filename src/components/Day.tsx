import React from 'react'

type Props = {
    date: Date
    viewingMonth: number
}

export default function Day({ date, viewingMonth }: Props) {
    if (date.getMonth() !== viewingMonth) {

    }

    return (
        <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300"}>
            <div className="flex justify-center pt-2">
                {date.getDate()}
            </div>
        </div>
    )
}