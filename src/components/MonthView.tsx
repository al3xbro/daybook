"use client"
import Day from "./Day"

type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function MonthView({ date }: Props) {

    const currMonth = date.month
    const currYear = date.year

    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()
    const daysInMonth = new Date(currYear, currMonth, 0).getDate()
    const daysToRender = (Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7) - firstDayOfMonth

    // all dates to be rendered
    const days: Date[] = []

    // adds all dates i forgot how this even works i went brazy that day
    for (let i = (-firstDayOfMonth + 1);
        i <= daysToRender;
        i++) {
        days.push(new Date(currYear, currMonth, i))
    }

    return (
        <div className="flex flex-col mt-16 w-full">
            <div className="grid grid-cols-7 w-full h-full justify-center">
                {days.map((e) => <Day date={e} viewingMonth={currMonth} key={e.getTime()} />)}
            </div>
        </div>
    )
}