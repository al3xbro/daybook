import prismaClient from "@/lib/prisma";
import { cookies } from 'next/headers'
import cookie from "@/lib/cookies";
import { z } from "zod"
import { Days } from "@prisma/client";
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

        // creates entry 
        await prismaClient.entry.create({
            data: {
                title: formData.get("title")?.toString() ?? "Unnamed",
                notes: formData.get("notes")?.toString(),
                startTime: formData.has("startTime") ? formData.get("startTime")?.toString() : null,
                endTime: formData.get("endTime")?.toString() ?? new Date(),
                userId: id,
                // @ts-ignore
                repeatOn: RepeatTypes[formData.get("repeatOn")?.toString()],
                // @ts-ignore
                startDay: formData.has("startDay") ? Days[formData.get("startDay")?.toString()] : null,
                // @ts-ignore
                endDay: Days[formData.get("endDay")?.toString()] ?? new Date(),
            }
        })

        return new Response("ok", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}