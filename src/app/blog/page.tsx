import type { Metadata} from "next";
import {getBlogList} from "@/service/BlogService";
import Link from "next/link";
import {Suspense} from "react";
import Library from "@/app/blog/library";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";
import {login} from "@/service/UserService";

export const metadata : Metadata = {
    title: "blog page",
    description: "XXX"
}

export default async function UserPage() {
    const data = await getServerSession(authOptions)

    return (
        <main>
            <section>


            </section>
            <section>
                <Suspense fallback={<div>LOADING POSTSJHRITJIRJTHI</div>}>
                    <Library />
                </Suspense>
            </section>
        </main>
    )
}