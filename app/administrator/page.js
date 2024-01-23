// 'use client'
// import { SessionProvider } from "next-auth/react";

// import Content from "./Content";
import { redirect } from "next/navigation";


export default function Admin({session}) {
    redirect("/administrator/dashboard")
    return (
        <></>
        // <SessionProvider  session={session}>
        //         <Content/>
        // </SessionProvider>
    );
}
