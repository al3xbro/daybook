import prismaClient from "@/lib/prisma";
import { cookies } from 'next/headers'
import cookie from "@/lib/cookies";
import { z } from "zod"
import { RepeatTypes } from "@prisma/client";

export async function GET(req: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get(cookie)
    const { searchParams } = new URL(req.url);

    try {
        const start = new Date(z.string().parse(searchParams.get("date")))
        const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds() - 1)

        const sessionValue = z.string().parse(session?.value)

        // gets all events and tasks for that day
        /* const data = await prismaClient.session.findUnique({
            where: {
                sessionToken: sessionValue
            },
            select: {
                user: {
                    select: {
                        Entry: {
                            where: {
                                OR: [
                                    {
                                        AND: [
                                            {
                                                startTime: {
                                                    gte: start.toISOString(),
                                                    lte: end.toISOString(),
                                                },
                                            }
                                        ],
                                    },
                                    {
                                        endTime: {
                                            gte: start.toISOString(),
                                            lte: end.toISOString(),
                                        }
                                    },
                                    { repeatOn: "daily" },
                                    {
                                        AND: [
                                            { repeatOn: "weekly" },
                                            {
                                                OR: [

                                                    // if the requested day is the same as the event day
                                                ]
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
                                repeatOn: true,
                            },

                        }
                    }
                }
            }
        })

        return new Response(JSON.stringify(data?.user.Entry), { status: 200 }) */
        return new Response("ok", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}

export async function POST(req: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get(cookie)

    try {
        const formData = await req.formData()
        const sessionValue = z.string().parse(session?.value)

        // gets primative data from form
        const title = formData.get("title")?.toString() ?? "Unnamed"
        const notes = formData.get("notes")?.toString() ?? ""

        // gets repeatOn and converts to RepeatTypes
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

        // gets startDate from form
        const startDate = new Date(z.string().parse(formData.get("startDate")?.toString()))

        // gets startTime, endTime, date, day
        const startTime = startDate.getHours().toString() + startDate.getMinutes().toString()
        let endTime
        if (formData.has("endTime")) {
            endTime = z.string().parse(formData.get("endTime")?.toString()).substring(0, 2) + z.string().parse(formData.get("endTime")?.toString()).substring(3, 5)
        } else {
            endTime = ""
        }
        const date = startDate.getFullYear().toString() + startDate.getMonth().toString() + startDate.getDate().toString()
        const day = startDate.getDay()

        // gets userid from session
        const user = await prismaClient.session.findUnique({
            where: {
                sessionToken: sessionValue
            },
            select: {
                userId: true
            }
        })
        const userId = user ? user["userId"].toString() : ""

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
        return new Response("ok", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}