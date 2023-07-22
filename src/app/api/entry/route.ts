import prismaClient from "@/lib/prisma";
import { cookies } from 'next/headers'
import cookie from "@/lib/cookies";
import { z } from "zod"
import { Days } from "@prisma/client";

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
        const data = await req.formData()
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

        console.log(data)

        // creates entry 
        await prismaClient.entry.create({
            data: {
                title: data.get("title")?.toString() ?? "Unnamed",
                notes: data.get("notes")?.toString(),
                startTime: data.has("startTime") ? data.get("startTime")?.toString() : null,
                endTime: data.get("endTime")?.toString() ?? new Date(),
                userId: id
                // TODO: add repeating weekdays
            }
        })
        return new Response("ok", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}