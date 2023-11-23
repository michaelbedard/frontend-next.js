'use client'

import {signIn, useSession} from "next-auth/react";


const Login = () => {

    const { data : session } = useSession()

    async function onSubmit() {

        console.log(onSubmit)

        const result = await signIn("credentials", {
            email: "mic@gmail.com",
            password: "123",
            redirect: false,
            // callbackUrl: "/blog"
        })

        console.log(result)
    }

    return (
        <main>
            CUSTOM LOGIN PAGE
            <button onClick={() => onSubmit()}>SIGN IN</button>
        </main>
    )
}

export default Login