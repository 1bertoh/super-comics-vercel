'use client'
// import { SessionProvider  } from "next-auth/react";
import Tabs from "./tabs";

export default function Dashboard({session}) {
    return (
        // <SessionProvider session={session}>
        // </SessionProvider>
            <Tabs/>
    );
}
