"use client"
import MonthView from "@/components/monthview/MonthView";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CalendarNavbar from "@/components/CalendarNavbar";
import WeekView from "@/components/weekview/WeekView";
import DayView from "@/components/dayview/DayView";

const today = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    date: new Date().getDate()
}

export default function ProtectedCalendar() {
    const [date, setDate] = useState(today);
    const [view, setView] = useState("month")

    function currView() {
        switch (view) {
            case "month":
                return <MonthView date={date} />
            case "day":
                return <DayView date={date} />
            case "week":
                return <WeekView date={date} />
            default:
                return <h1>Month View</h1>
        }
    }

    const { status } = useSession();
    if (status === "unauthenticated") {
        redirect("/");
    }
    return (
        <>
            <CalendarNavbar date={date} setDate={setDate} view={view} setView={setView} />
            <div className="flex flex-row w-full h-full">
                <Sidebar />
                {currView()}
            </div>
        </>
    )
}
