import { signIn } from "next-auth/react"

export default function LandingNavbar() {
    return (
        <div className="h-16 w-full fixed flex items-center pl-10 pr-10 md:pl-20 md:pr-20 lg:pl-40 lg:pr-40 border border-gray-300">
            <div className="flex-1">STILL UNDER DEVELOPMENT. THIS IS JUST A DEMO.</div>
            <div className="flex flex-1 items-center justify-end gap-10">
                <button onClick={() => { signIn("google", { callbackUrl: "/calendar" }) }} className="nav-button">
                    Sign in with Google
                </button>
                <a href="https://github.com/al3xbro/daybook"><img className=" w-[30px]" src="/github-mark.png" alt="github" /></a>
            </div>
        </div>
    )
}