'use client';

import React, {useEffect, useState} from "react";
import {getBlogListByStatus} from "@/service/BlogService";
import {useSession} from "next-auth/react";
import Loading from "@/app/loading";
import Link from "next/link";

interface BlogListByStatusCSRProps {
    status: "PUBLIC" | "PRIVATE",

}

export default function BlogListByStatusCSR({status} : BlogListByStatusCSRProps) {
    const [data, setData] = useState<{id: string, path: string, title: string}[] | null>(null)
    const { data : session } = useSession()

    useEffect(() => {
        if (session?.user) {
            getBlogListByStatus(session?.user.jwtToken, status, ["path", "title"])
                .then((r) => {
                    console.log(r)
                    setData(r)
                })
                .catch(() => {
                    console.log("ERROR")
                })
        }
    }, [status, session])

    if (data == null) {
        return <Loading size={"MEDIUM"} />
    } else {
        return (
            <ul style={{width: "100%", justifyContent: "start"}}>
                {data.map((blog) => {
                    return (
                        <li key={blog.id}>
                            <Link href={`blog-manager/${blog.path}`}>{blog.title}</Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}