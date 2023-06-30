"use client"
import { useState } from "react"
import Day from "./Day"

export default function MonthView() {

    const dt = new Date()
    const currMonth = dt.getMonth()
    const currYear = dt.getFullYear()

    const [month, setMonth] = useState(currMonth)

    const firstDayOfMonth = new Date(currYear, month, 1).getDay()
    const daysInMonth = new Date(currYear, currMonth, 0).getDate()
    const daysToRender = (Math.ceil((firstDayOfMonth + daysInMonth - 1) / 7) * 7) - firstDayOfMonth

    const days: Date[] = []

    for (let i = (-firstDayOfMonth + 1);
        i <= daysToRender;
        i++) {
        days.push(new Date(currYear, month, i))
    }

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex gap-4">
                <button className="w-10 border" onClick={() => setMonth(month - 1)}>-</button>
                <div>{month + 1}</div>
                <button className="w-10 border" onClick={() => setMonth(month + 1)}>+</button>
            </div>
            <div className="grid border grid-cols-7 max-w-6xl w-full">
                {days.map((e) => <Day date={e} />)}
            </div>
        </div>
    )
}