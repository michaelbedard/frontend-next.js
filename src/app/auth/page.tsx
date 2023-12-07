'use client'

import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import LoginForm from "@/components/loginForm/loginForm";


const Login = () => {

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