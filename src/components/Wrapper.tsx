"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

type Props = {
    children?: ReactNode;
    session: any;
};

const queryClient = new QueryClient()

export default function Wrapper({ session, children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </QueryClientProvider>
    );
}