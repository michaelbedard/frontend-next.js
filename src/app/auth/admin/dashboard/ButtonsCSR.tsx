'use client';

import {Button} from "@/components/button/button";
import { useRouter } from "next/navigation";

interface ButtonsCSRProps {

}

export default function ButtonsCSR({} : ButtonsCSRProps) {
    const router = useRouter();

    return (
        <>
            <Button
                label={"blog manager"}
                onClick={() => router.push("/auth/admin/dashboard/blog-manager")}
                style={{height: "100px", width: "min(100%, 700px)", marginBottom: "20px"}}
            />
            <Button
                label={"pool manager"}
                onClick={() => router.push("/auth/admin/dashboard/pool-manager")}
                style={{height: "100px", width: "min(100%, 700px)", marginBottom: "20px"}}
            />
            <Button
                label={"tag manager"}
                onClick={() => router.push("/auth/admin/dashboard/tag-manager")}
                style={{height: "100px", width: "min(100%, 700px)"}}
            />
        </>
    )
}