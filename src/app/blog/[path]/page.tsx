import React, {Suspense} from "react";
import ContentCSR from "@/app/blog/[path]/contentCSR";
import CommentsSSR from "@/app/blog/[path]/commentsSSR";
import {getBlogContent, getBlogInfo} from "@/service/BlogService";
import {isBlogInfoType} from "@/utils/typeChecker";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import HeaderSSR from "@/app/blog/[path]/headerSSR/headerSSR";
import {getServerSession} from "next-auth";
import {Button} from "@/components/button/button";
import Link from "next/link";
import Loading from "@/app/loading";

interface BlogPageProps {
    params : {path : string}
    searchParams?: { data : string }
}

export async function generateMetadata({ params }: BlogPageProps) {
    try {
        const blogInfoData : blogInfoType = await getBlogInfo(params.path)
        return {
            title: blogInfoData.title,
            description: blogInfoData.subtitle, // ADD TAGS
            alternates: {
                canonical: `/blog/${params.path}`
            }
        }
    } catch {
        return {
            title: "Not found",
            description: "The page you are looking for does not exist",

        }
    }
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
    let data : blogInfoType = searchParams?.data != undefined
        ? (isBlogInfoType(JSON.parse(searchParams.data)) ? JSON.parse(searchParams.data) : null)
        : null;

    return (
        <>
            <main>
                <Suspense fallback={<Loading size={"MEDIUM"} /> }>
                    <HeaderSSR path={params.path} data={data}/>
                </Suspense>

                <Suspense fallback={<div/>}>
                    <EditLink path={params.path} />
                </Suspense>

                {/*creates some space between cover image and intro*/}
                <div style={{height: "30px"}}/>

                <Suspense fallback={<Loading size={"LARGE"} />}>
                    <ContentSSR path={params.path}/>
                </Suspense>

                <Suspense fallback={<Loading size={"MEDIUM"} />}>
                    <CommentsSSR path={params.path}/>
                </Suspense>
            </main>
        </>
    )
}

async function EditLink({path} : {path: string}) {
    const data = await getServerSession()

    if (data && data.user.role == "ADMIN") {
        return (
            <section>
                <Link href={`/auth/admin/dashboard/blog-manager/${path}`}>Edit Blog</Link>
            </section>
        )
    }
    return <div/>
}

async function ContentSSR({path} : {path: string}) {
    const data: blogContentType = await getBlogContent(path);
    return <ContentCSR data={data}/>
}