'use client';

import {Button} from "@/components/button/button";
import { useRouter } from "next/navigation";
import {useSession} from "next-auth/react";
import {createBlueprint} from "@/service/BlueprintService";
import Link from "next/link";

export default function CallToActionCSR() {
    const router = useRouter();
    const { data : session } = useSession();

    async function handleClick() {
        if (session?.user) {
            await createBlueprint(session.user.jwtToken)
                .then((r) => {
                    router.push(`/auth/user/dashboard/${r}`)
                })
        } else {
            router.push("/auth?CALLBACK_URL=/blueprints");
        }
    }

    return (
        <>
            <Button
                style={{height: "100px"}}
                label={"Create a Blueprint Now"}
                onClick={handleClick}
                image={<img alt={"create"} src={"../../../assets/logo.png"}/>}
            />
            <p style={{textAlign: "center", marginTop: "20px"}}>
                Blueprints allows you to promote your project through a blog post
            </p>
        </>
    )
}