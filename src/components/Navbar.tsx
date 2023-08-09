"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

type Props = {
    date: Date,
    setDate: Function
}

export default function Navbar({ date, setDate }: Props) {

    const { status } = useSession()
    return (
        <>
            <div className="h-16 w-full fixed flex items-center pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-40 lg:pr-40 border border-gray-300">
                <div className="flex-1">STILL UNDER DEVELOPMENT. THIS IS JUST A DEMO.</div>
                <div className="flex flex-1 gap-3">
                    <div onClick={() => {
                        const newDate = date
                        newDate.setMonth(date.getMonth() - 1)
                        setDate(newDate)
                    }}>{"<"}</div>
                    <div onClick={() => {
                        const newDate = date
                        newDate.setMonth(date.getMonth() + 1)
                        setDate(newDate)
                    }}>{">"}</div>
                </div>
                <div className="flex flex-1 items-center justify-end gap-10">
                    {/* shows different buttons based on authentication status */}
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