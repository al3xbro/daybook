import prismaClient from "@/lib/prisma";
import { cookies } from 'next/headers'
import cookie from "@/lib/cookies";
import { z } from "zod"
import { RepeatTypes } from "@prisma/client";

/**
 * pass a query with searchParams.date as a string in the form of "yyyymmdd"
 */
export async function GET(req: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get(cookie)
    const { searchParams } = new URL(req.url);

    try {
        // gets day and date
        const date = z.string().parse(searchParams.get("date"))
        const day = new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6)) - 1, parseInt(date.substring(6, 8))).getDay() + 1

        // gets session value from cookies
        const sessionValue = z.string().parse(session?.value)

        // gets all events and tasks for that day
        const data = await prismaClient.session.findUnique({
            where: {
                sessionToken: sessionValue
            },
            select: {
                user: {
                    select: {
                        Entry: {
                            where: {
                                OR: [
                                    { date: date },
                                    { repeatOn: "daily" },
                                    {
                                        AND: [
                                            { repeatOn: "weekly" },
                                            {
                                                day: day
                                            }
                                        ]
                                    },
                                    {
                                        AND: [
                                            { repeatOn: "monthly" },
                                            {
                                                date: {
                                                    endsWith: date.substring(6, 8)
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        AND: [
                                            { repeatOn: "yearly" },
                                            {
                                                date: {
                                                    endsWith: date.substring(4)
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            select: {
                                title: true,
                                notes: true,
                                startTime: true,
                                endTime: true,
                            },

                        }
                    }
                }
            }
        })

        return new Response(JSON.stringify(data?.user.Entry), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}
/**
 * pass formData with the following fields:
 *  title: string
 *  notes: string
 *  repeatOn: string
 *  startDate: string from Date object
 *  endTime: string in the form of "hh:mm"
 */
export async function POST(req: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get(cookie)

    try {
        const formData = await req.formData()
        const sessionValue = z.string().parse(session?.value)

        // gets primative data from form
        const title = formData.get("title")?.toString() ?? "Unnamed"
        const notes = formData.get("notes")?.toString() ?? ""

        // gets repeatOn and converts to RepeatTypes. this sucks
        let repeatOnString = z.string().parse(formData.get("repeatOn")?.toString())
        let repeatOn
        switch (repeatOnString) {
            case "none":
                repeatOn = RepeatTypes.none
                break
            case "daily":
                repeatOn = RepeatTypes.daily
                break
            case "weekly":
                repeatOn = RepeatTypes.weekly
                break
            case "monthly":
                repeatOn = RepeatTypes.monthly
                break
            case "yearly":
                repeatOn = RepeatTypes.yearly
                break
            default:
                repeatOn = RepeatTypes.none
                break
        }

        // gets startTime, endTime, date, day
        const date = z.string().parse(formData.get("date")?.toString())
        const startTime = z.string().parse(formData.get("startTime")?.toString())
        const endTime = formData.has("endTime") ? z.string().parse(formData.get("endTime")?.toString()) : ""    // event or reminder
        const day = (new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6)) - 1, parseInt(date.substring(6, 8)))).getDay() + 1

        // gets userid from session
        const user = await prismaClient.session.findUnique({
            where: {
                sessionToken: sessionValue
            },
            select: {
                userId: true
            }
        })
        if (!user) return new Response("are u logged in", { status: 500 })
        const userId = user["userId"].toString()

        // creates entry 
        await prismaClient.entry.create({
            data: {
                userId: userId,
                title: title,
                notes: notes,
                repeatOn: repeatOn,

                date: date,
                day: day,

                startTime: startTime,
                endTime: endTime
            }
        })
        return new Response("ur chillen", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("something went wrong", { status: 500 })
    }
}