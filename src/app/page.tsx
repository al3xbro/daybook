import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";



export default async function Home() {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect("/calendar")
    }

    return (
        <>
            <div className="mt-20">
                <div className="text-center">WELCOME TO YOUR DAYBOOK</div>
                <div className="text-center">LANDING PAGE HERE</div>
            </div >
        </>
    )
}
