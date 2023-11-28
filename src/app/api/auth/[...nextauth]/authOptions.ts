import {User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/service/UserService";
import {setLocalStorage} from "@/utils/storageHelper";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "creds",
            credentials: {
                email: {label: "Email", placeholder: "Enter email"},
                password: {label: "Password", placeholder: "Enter Password"}
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                try {
                    // login returns any for now...
                    const userData = await login(credentials.email, credentials.password)

                    if (!userData || !userData.user) {
                        return null;
                    }

                    return {
                        id: userData.user.id,
                        jwtToken: userData.jwtToken,
                        name: userData.user.name,
                        email: userData.user.email,
                        role: userData.user.role,
                    };
                    //
                    // return {
                    //     id: "7",
                    //     jwtToken: "kk",
                    //     name: "ll",
                    //     email: "emailsuewi",
                    //     role: "fnjew",
                    // };

                } catch (e) {
                    return null;
                }
            }
        })
        // ...add more providers here
    ],
    pages: {
        signIn: "/auth",  //for custom sign in page
    },
    callbacks: {
        async jwt({token, user} : { token: { [key: string]: any }; user: any }){
            return {... token, ...user}
        },

        async session({ session, token}: { session: any; token: any }) {
            session.user = token as any;
            return session;
        },

        // async signIn({ user, account, profile, email, credentials } : any ) {
        //     const isAllowedToSignIn = true
        //     if (isAllowedToSignIn) {
        //         return true
        //     } else {
        //         // Return false to display a default error message
        //         return false
        //         // Or you can return a URL to redirect to:
        //         // return '/unauthorized'
        //     }
        // }
    },
};
