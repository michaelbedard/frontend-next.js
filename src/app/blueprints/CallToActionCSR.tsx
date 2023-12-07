'use client';

import {Button} from "@/components/button/button";
import { useRouter } from "next/navigation";

export default function CallToActionCSR() {
    const router = useRouter();

    return (
        <>
            <Button
                style={{height: "100px"}}
                label={"Create a Blueprint Now"}
                onClick={() => router.push("/auth/user/dashboard/create-blueprint")}
                image={<img alt={"create"} src={"../../../assets/logo.png"}/>}
            />
            <p style={{textAlign: "center", marginTop: "20px"}}>
                Blueprints allows you to promote your project through a blog post
            </p>
        </>
    )
}