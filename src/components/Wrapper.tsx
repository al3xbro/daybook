"use client"
import { SessionProvider, getSession } from "next-auth/react"

type Props = {
    children?: React.ReactNode
    session: any
}

export default function Wrapper({ children, session }: Props) {



    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}