"use client"
import MonthDay from "./MonthDay"

type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function MonthView({ date }: Props) {

    const firstDayOfMonth = new Date(date.year, date.month, 1).getDay()
    const daysInMonth = new Date(date.year, date.month + 1, 0).getDate()
    const daysToRender = (Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7) - firstDayOfMonth

    // all dates to be rendered
    const days: Date[] = []

    // adds all dates i forgot how this even works i went brazy that day
    for (let i = (-firstDayOfMonth + 1);
        i <= daysToRender;
        i++) {
        days.push(new Date(date.year, date.month, i))
    }

    return (
        <div className="flex flex-col mt-16 w-full">
            <div className="grid grid-cols-7 w-full h-full justify-center">
                {days.map((e) => <MonthDay date={e} viewingMonth={date.month} key={e.getTime()} />)}
            </div>
        </div>
    )
}