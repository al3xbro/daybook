"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Navbar() {

    const { data: session, status } = useSession()
    return (
        <>
            <div className="h-16 w-full bg-gray-200 fixed flex items-center pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-40 lg:pr-40">
                <div className="flex-1">Daybook</div>
                <div className="flex flex-1 items-center justify-end gap-10">
                    {status === "authenticated" ?
                        <button onClick={() => signOut()} className="nav-button">
                            Sign out
                        </button>
                        :
                        <button
                            onClick={() => {
                                signIn("google", { callbackUrl: "/calendar" })
                            }}
                            className="nav-button">
                            <Image src="" alt="" />
                            Sign in with Google
                        </button>
                    }
                    <a href="https://github.com/al3xbro/daybook"><img className=" w-[30px]" src="/github-mark.png" alt="github" /></a>
                </div>
            </div >
        </>
    )
}