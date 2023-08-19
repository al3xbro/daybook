"use client"
import { signOut } from "next-auth/react"
import { Dispatch, SetStateAction } from "react"

type Props = {
    date: {
        month: number,
        year: number,
        date: number
    },
    setDate: Dispatch<SetStateAction<{
        month: number,
        year: number,
        date: number
    }>>,
    view: string,
    setView: Dispatch<SetStateAction<string>>
}

export default function CalendarNavbar({ date, setDate, view, setView }: Props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div>
            <div className="h-16 w-full fixed flex items-center pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-40 lg:pr-40 border border-gray-300">
                <div className="flex-1">STILL UNDER DEVELOPMENT. THIS IS JUST A DEMO.</div>
                <div className="flex flex-1 gap-3 justify-center">
                    <div onClick={() => {
                        switch (view) {
                            case "month": {
                                const newDate = new Date(date.year, date.month - 1, date.date)
                                setDate({
                                    month: newDate.getMonth(),
                                    year: newDate.getFullYear(),
                                    date: newDate.getDate()
                                })
                                break;
                            }
                            case "week": {
                                const newDate = new Date(date.year, date.month, date.date - 7)
                                setDate({
                                    month: newDate.getMonth(),
                                    year: newDate.getFullYear(),
                                    date: newDate.getDate()
                                })
                                break;
                            }
                            case "day": {
                                const newDate = new Date(date.year, date.month, date.date - 1)
                                setDate({
                                    month: newDate.getMonth(),
                                    year: newDate.getFullYear(),
                                    date: newDate.getDate()
                                })
                                break;
                            }
                        }
                    }
                    }>{"<"}</div>
                    <div>{`${months[date.month]} ${date.date}, ${date.year}`}</div>
                    <div onClick={() => {
                        switch (view) {
                            case "month": {
                                const newDate = new Date(date.year, date.month + 1, date.date)
                                setDate({
                                    month: newDate.getMonth(),
                                    year: newDate.getFullYear(),
                                    date: newDate.getDate()
                                })
                                break;
                            }
                            case "week": {
                                const newDate = new Date(date.year, date.month, date.date + 7)
                                setDate({
                                    month: newDate.getMonth(),
                                    year: newDate.getFullYear(),
                                    date: newDate.getDate()
                                })
                                break;
                            }
                            case "day": {
                                const newDate = new Date(date.year, date.month, date.date + 1)
                                setDate({
                                    month: newDate.getMonth(),
                                    year: newDate.getFullYear(),
                                    date: newDate.getDate()
                                })
                                break;
                            }
                        }
                    }}>{">"}</div>
                </div>
                <div className="flex flex-1 justify-center">
                    <div className="w-fit text-center">
                        <div onClick={() => {
                            if (view === "week") {
                                setView("month")
                            } else if (view === "day") {
                                setView("week")
                            }
                        }}>^</div>
                        <div>{view}</div>
                        <div onClick={() => {
                            if (view === "month") {
                                setView("week")
                            } else if (view === "week") {
                                setView("day")
                            }
                        }}>˅</div>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-end gap-10">
                    <button onClick={() => signOut()} className="nav-button">
                        Sign out
                    </button>
                    <a href="https://github.com/al3xbro/daybook"><img className=" w-[30px]" src="/github-mark.png" alt="github" /></a>
                </div>
            </div >
        </div >
    )
}