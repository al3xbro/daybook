import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismaClient from "@/lib/prisma"
import type { Adapter } from 'next-auth/adapters';
import { redirect } from "next/navigation"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient) as Adapter,
    session: {
        strategy: "database",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }