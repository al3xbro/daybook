import MonthView from "@/components/MonthView";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedCalendar() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }
    return (

        <div className="flex flex-row w-full h-full">
            <Sidebar />
            <MonthView />
        </div>
    )
}
