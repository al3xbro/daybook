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
        console.log(req.json())
    } catch (error) {
        console.log(error)
        return new Response("error", { status: 500 })
    }
}