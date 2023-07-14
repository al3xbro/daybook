"use client"
import { useSession } from "next-auth/react"

type Entry = {
    title: String;
    notes: String | undefined;
    startTime: Date | undefined;
    endTime: Date;
}

export default function Sidebar() {
    return (
        <div className="flex flex-col w-1/6 pt-10 bg-gray-300 mt-16">
            <button className="self-center side-button" onClick={() => {/* POST to entry/post, pass an entry */ }}>Create Entry</button>
        </div>
    )
}