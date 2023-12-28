"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

    const { status } = useSession()

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="p-4 border-black border-2 rounded-lg"
                onClick={status == "authenticated" ? () => { signOut() } : () => { signIn("google"), { callback: "/" } }}
            >
                {status == "authenticated" ? "logout" : "login"}
            </div>
        </div>
    )
}
