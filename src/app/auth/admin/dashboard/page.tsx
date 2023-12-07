import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import ButtonsCSR from "@/app/auth/admin/dashboard/ButtonsCSR";


export default async function Dashboard() {

    return (
        <main>
            <PrimaryTitle title={"ADMIN DASHBOARD"} />
            <SocialLinksSection />

            <section>
                <SecondaryTitle text={"managers"} />
                <ButtonsCSR />
            </section>
        </main>
    )
}