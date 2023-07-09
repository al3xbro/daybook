"use client"
import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"

export default function Navbar() {

    const { data: session, status } = useSession()
    return (
        <>
            <div className="h-16 w-full border-b-2 border-gray-600 bg-gray-200 fixed flex items-center">
                <div>Daybook</div>
                {status === "authenticated" ? <div onClick={() => signOut()}>Log Out</div> : <div onClick={() => signIn()}>Log In</div>}
                <a href="https://github.com/al3xbro/daybook"><img className="w-[30px]" src="/github-mark.png" alt="github" /></a>
            </div>
        </>
    )
}