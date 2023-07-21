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
    const daysToRender = (Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7) - firstDayOfMonth
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 'November', "December"]

    // all dates to be rendered
    const days: Date[] = []

    // adds all dates i forgot how this even works i went brazy that day
    for (let i = (-firstDayOfMonth + 1);
        i <= daysToRender;
        i++) {
        days.push(new Date(currYear, month, i))
    }

    return (
        <div className="flex flex-col mt-16 w-full">
            <div className="flex gap-10 justify-center border border-gray-300 p-4">
                <div className="flex gap-4">
                    <button className="w-10 border-2 border-gray-300 active:border-gray-400" onClick={() => setMonth(month - 1)}>-</button>
                    <div>{months[new Date(currYear, month).getMonth()] + " " + new Date(currYear, month).getFullYear()}</div>
                    <button className="w-10 border-2 border-gray-300 active:border-gray-400" onClick={() => setMonth(month + 1)}>+</button>
                </div>
                <button className="w-40 border-2 border-gray-300 active:border-gray-400" onClick={() => setMonth(currMonth)}>Today</button>
            </div>
            <div className="grid grid-cols-7 w-full h-full justify-center">
                {days.map((e) => <Day date={e} viewingMonth={new Date(currYear, month).getMonth()} key={e.getTime()} />)}
            </div>
        </div>
    )
}