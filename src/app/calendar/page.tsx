"use client"
import MonthView from "@/components/MonthView";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default async function ProtectedCalendar() {
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState("month")

    const { status } = await useSession();
    if (status === "unauthenticated") {
        redirect("/");
    }
    return (
        <>
            <Navbar date={date} setDate={setDate} />
            <div className="flex flex-row w-full h-full">
                <Sidebar />
                <MonthView date={date} setDate={setDate} />
            </div>
        </>
    )
}
