import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
    date: Date
    viewingMonth: number
}

type Event = {
    id: string
    title: string
    startTime: string
    endTime: string
    notes: string
    color: string
}

export default function WeekDay({ date, viewingMonth }: Props) {

    // queries for entries
    const dateString = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`
    const query = useQuery({
        queryKey: [dateString], // yyyymmdd
        queryFn: async () => {
            return axios.get(`/api/entry?date=${dateString}`)
        },
    })
    const events = query.data?.data

    if (query.isError) {
        return (
            <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 flex justify-center"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    error
                </div>
            </div>
        )
    }
    if (query.isLoading) {
        return (
            <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 flex justify-center"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    loading
                </div>
            </div>
        )
    }

    // renders date with entries
    return (
        <div className={(date.getMonth() !== viewingMonth ? "text-gray-300" : "text-black") + " border border-gray-300 justify-center relative"}>
            <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 z-10 ${date.toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                {date.getDate()}
            </div>
            <div className='absolute -top-0 h-full w-full'>
                {events.map((event: Event) => {
                    // duration in hours
                    const duration = (parseInt(event.endTime.slice(0, 2)) + (parseInt(event.endTime.slice(2, 4)) / 60)) - (parseInt(event.startTime.slice(0, 2)) + (parseInt(event.startTime.slice(2, 4)) / 60))
                    return (
                        <div style={{
                            height: `${duration / 0.24}%`,
                            top: `${(parseInt(event.startTime.slice(0, 2)) + (parseInt(event.startTime.slice(2, 4)) / 60)) / 0.24}%`,
                            backgroundColor: event.color + "60"
                        }} key={event.id} className="w-full flex justify-between pl-1 pr-1 bg-purple-300/50 -z-10 absolute">
                            <div>{event.title}</div>
                            <div>{`${event.startTime.slice(0, 2)}:${event.startTime.slice(2, 4)} - ${event.endTime.slice(0, 2)}:${event.endTime.slice(2, 4)}`}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}