'use client';

import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import {getServerSession} from "next-auth";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Styles from "./userDashboard.module.css"
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import {Button} from "@/components/button/button";
import Library from "@/components/library/library";
import React, {Suspense} from "react";
import Loading from "@/app/loading";
import {getBlogListByStatus} from "@/service/BlogService";
import {getBlueprintListByStatusAndByUser} from "@/service/BlueprintService";
import Link from "next/link";
import CallToActionCSR from "@/app/blueprints/CallToActionCSR";


export default function UserDashboard() {
    const { data : session } = useSession()
    const router = useRouter()

    if (!session?.user) {
        router.push("/");
        return;
    }

    return (
        <main>
            <BackgroundImage alt={"back image"} imageSource={"../../assets/pencil.png"} />
            <PrimaryTitle title={"MY DASHBOARD"} />
            <SocialLinksSection />

            <section>
                <SecondaryTitle text={"My Info"} />
                <div className={Styles.infoContainer}>
                    <div className={Styles.infoBox}>
                        Name: <span>{session.user.name}</span>
                    </div>
                    <div className={Styles.infoBox}>
                        Email: <span>{session.user.email}</span>
                    </div>
                </div>
            </section>

            <section>
                <SecondaryTitle text={"Create a Blueprint"}/>
                {/*<Button*/}
                {/*    style={{height: "100px"}}*/}
                {/*    label={"Create a Blueprint Now"}*/}
                {/*    onClick={() => router.push("/auth/user/dashboard/create-blueprint")}*/}
                {/*    image={<img alt={"create"} src={"../../../assets/logo.png"}/>}*/}
                {/*/>*/}
                <CallToActionCSR />
            </section>
            <section>
                <SecondaryTitle text={"My Blueprints - Public"} />
                <Suspense fallback={<Loading size={"MEDIUM"} /> }>
                    <BlueprintListByStatusAndByUser token={session.user.jwtToken} status={"PUBLIC"}/>
                </Suspense>
            </section>

            <section>
                <SecondaryTitle text={"My Blueprints - Draft"} />
                <Suspense fallback={<Loading size={"MEDIUM"} /> }>
                    <BlueprintListByStatusAndByUser token={session.user.jwtToken} status={"PRIVATE"}/>
                </Suspense>
            </section>
        </main>
    )
}

async function BlueprintListByStatusAndByUser({token, status} : {token : string, status: string}) {
    const data = await getBlueprintListByStatusAndByUser(token, status, ["title"])

    return (
        <ul style={{width: "100%", justifyContent: "start", marginLeft: "24px"}}>
            {data.map((blueprint: {id: string, title: string}) => {
                return (
                    <li key={blueprint.id}>
                        <Link href={`dashboard/${blueprint.id}`}>{blueprint.title}</Link>
                    </li>
                )
            })}
        </ul>
    )
}