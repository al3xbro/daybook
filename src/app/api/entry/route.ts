import prismaClient from "@/lib/prisma";
import { cookies } from 'next/headers'
import cookie from "@/lib/cookies";
import { z } from "zod"

export async function GET(req: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get(cookie)
    const { searchParams } = new URL(req.url);

    try {
        const start = new Date(z.string().parse(searchParams.get("date")))
        const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds() - 1)

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
                                    }
                                ]
                            },
                            select: {
                                title: true,
                                notes: true,
                                startTime: true,
                                endTime: true,
                                weekdays: true,
                            },

                        }
                    }
                }
            }
        })

        return new Response(JSON.stringify(data?.user.Entry))
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

        // gets userid from session
        const user = await prismaClient.session.findUnique({
            where: {
                sessionToken: sessionValue
            },
            select: {
                userId: true
            }
        })
        const id = user ? user["userId"].toString() : ""

        // places all weekday data into an array
        const weekdays = []
        if (formData.get("sun") == "true") weekdays.push({ days: "sunday" })
        if (formData.get("mon") == "true") weekdays.push({ days: "monday" })
        if (formData.get("tue") == "true") weekdays.push({ days: "tuesday" })
        if (formData.get("wed") == "true") weekdays.push({ days: "wednesday" })
        if (formData.get("thu") == "true") weekdays.push({ days: "thursday" })
        if (formData.get("fri") == "true") weekdays.push({ days: "friday" })
        if (formData.get("sat") == "true") weekdays.push({ days: "saturday" })

        // creates entry 
        await prismaClient.entry.create({
            data: {
                title: formData.get("title")?.toString() ?? "Unnamed",
                notes: formData.get("notes")?.toString(),
                startTime: formData.has("startTime") ? formData.get("startTime")?.toString() : null,
                endTime: formData.get("endTime")?.toString() ?? new Date(),
                userId: id,
                weekdays: {
                    // @ts-ignore
                    connect: weekdays
                }
            }
        })

        return new Response("ok", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}