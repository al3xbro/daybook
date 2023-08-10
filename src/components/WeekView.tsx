type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function WeekView({ date }: Props) {
    return (
        <div>
            <h1>Week View</h1>
        </div>
    )
}