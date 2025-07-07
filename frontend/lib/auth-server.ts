// /lib/auth-server.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getServerAuthSession = () => getServerSession(authOptions);
