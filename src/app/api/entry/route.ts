import prismaClient from "@/lib/prisma";
import { cookies } from 'next/headers'
import cookie from "@/lib/cookies";
import { z } from "zod"

export async function GET(req: Request) {
    const cookieStore = cookies()
    const session = cookieStore.get(cookie)
    const { searchParams } = new URL(req.url);
    try {
        const date = new Date(z.string().parse(searchParams.get("date")))
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
                                        endTime: {

                                            where: {
                                                AND: {
                                                    gte: date.getDate
                                                }
                                            }
                                        }
                                    },
                                    { startTime: date },
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