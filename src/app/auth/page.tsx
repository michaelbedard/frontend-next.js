'use client'

import {signIn, useSession} from "next-auth/react";
import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import LoginForm from "@/components/loginForm/loginForm";


const Login = () => {
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
            <BackgroundImage alt={"back image"} imageSource={"../../assets/pencil.png"} />
            <PrimaryTitle title={"LOGIN PAGE"} />
            <SocialLinksSection />

            <section>
                <LoginForm />
            </section>
        </main>
    )
}

export default Login