"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: any) {
  return <SessionProvider >{children}</SessionProvider>;
}


// 1. Session share karta hai globally
// useSession() hook kisi bhi component mein use kar sako — provider wrap karta hai toh session available rahta hai.
// tsx// kisi bhi component mein
// const { data: session } = useSession();
// console.log(session.user.name); // "Daksh"
// 2. Auto re-fetch karta hai session
// Tab, browser window focus hone pe automatically session refresh ho jaata hai.
// 3. Session sync karta hai across tabs
// Ek tab mein logout kiya → baaki tabs mein bhi logout ho jaata hai automatically.