import WeekDay from "./WeekDay";

type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function WeekView({ date }: Props) {

    const firstDateOfWeek = new Date(date.year, date.month, date.date - new Date(date.year, date.month, date.date).getDay())

    // all dates to be rendered
    const days: Date[] = []

    // adds all dates
    let i = 0
    while (i < 7) {
        days.push(new Date(firstDateOfWeek.getFullYear(), firstDateOfWeek.getMonth(), firstDateOfWeek.getDate() + i))
        i++
    }

    return (
        <div className="flex flex-col mt-16 w-full">
            <div className="grid grid-cols-7 w-full h-full justify-center">
                {days.map((e) => <WeekDay date={e} viewingMonth={date.month} key={e.getTime()} />)}
            </div>
        </div>
    )
}