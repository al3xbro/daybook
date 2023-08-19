import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
    date: {
        month: number,
        year: number,
        date: number
    }
}

export default function DayView({ date }: Props) {



    // queries for entries
    const dateString = `${date.year}${("0" + (date.month + 1)).slice(-2)}${("0" + date.date).slice(-2)}`
    const query = useQuery({
        queryKey: [dateString],
        queryFn: async () => {
            return axios.get(`/api/entry?date=${dateString}`)
        },
    })
    const events = query.data?.data

    if (query.isError) {
        return (
            <div className={"text-black border border-gray-300 flex justify-center mt-16 w-full "}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${(new Date(date.year, date.month, date.date)).toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    error
                </div>
            </div>
        )
    }
    if (query.isLoading) {
        return (
            <div className={"text-black border border-gray-300 flex justify-center mt-16 w-full"}>
                <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${(new Date(date.year, date.month, date.date)).toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                    loading
                </div>
            </div>
        )
    }

    // renders date with entries
    return (
        <div className={"text-black border border-gray-300 flex justify-center mt-16 w-full"}>
            <div className={`mx-auto text-center pt-2 w-10 h-10 rounded-full m-2 ${(new Date(date.year, date.month, date.date)).toDateString() == new Date().toDateString() ? "bg-blue-200" : ""}`}>
                {date.date}
                {JSON.stringify(events)}
            </div>
        </div>
    )
}