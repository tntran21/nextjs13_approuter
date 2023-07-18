"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const WithAuthProvider = ({ children, session }: { children: React.ReactNode; session?: Session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default WithAuthProvider;
