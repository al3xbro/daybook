import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
    date: Date,
}

type Event = {
    title: string
    startTime: number
    endTime: number
    notes: string
}

export default function DayView({ date }: Props) {

    // queries for entries
    const dateString = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`
    const query = useQuery({
        queryKey: [dateString],
        queryFn: async () => {
            return axios.get(`/api/entry?date=${dateString}`)
        },
    })
    const events = query.data?.data

    if (query.isError) {
        return (
            <div className={"text-black border border-gray-300 flex justify-center mt-16 w-full"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${(new Date(date.getFullYear(), date.getMonth(), date.getDate())).toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    error
                </div>
            </div>
        )
    }
    if (query.isLoading) {
        return (
            <div className={"text-black border border-gray-300 flex justify-center mt-16 w-full"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${(new Date(date.getFullYear(), date.getMonth(), date.getDate())).toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    loading
                </div>
            </div>
        )
    }

    // renders date with entries
    return (
        <div className={"text-black border border-gray-300 justify-center relative"}>
            <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 z-10 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                {date.getDate()}
            </div>
            <div className='absolute -top-0 h-full w-full'>
                {events.map((event: Event) => {
                    return (
                        <div style={{ height: `${((event.endTime - event.startTime) / 24)}%`, top: `${(event.startTime / 24)}%` }} key={event.title} className="w-full bg-purple-300/50 -z-10 absolute">
                            {`${event.title} ${event.startTime} ${event.endTime}`}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}