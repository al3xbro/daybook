import WeekDay from "./WeekDay";

type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function WeekView({ date }: Props) {

    const firstDateOfWeek = (new Date(date.year, date.month, date.date - new Date(date.year, date.month, 1).getDay() - 1)).getDate()

    // all dates to be rendered
    const days: Date[] = []

    // adds all dates
    for (let i = firstDateOfWeek;
        i < firstDateOfWeek + 7;
        i++) {
        days.push(new Date(date.year, date.month, i))
    }

    return (
        <div className="flex flex-col mt-16 w-full">
            <div className="grid grid-cols-7 w-full h-full justify-center">
                {days.map((e) => <WeekDay date={e} viewingMonth={date.month} key={e.getTime()} />)}
            </div>
        </div>
    )
}