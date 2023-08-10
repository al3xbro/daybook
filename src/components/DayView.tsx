type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function DayView({ date }: Props) {
    return (
        <div>
            <h1>Day View</h1>
        </div>
    )
}