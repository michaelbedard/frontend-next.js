
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string,
            jwtToken: string,
            role: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        jwtToken: string,
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string
    }
}