import React, {Suspense} from "react";
import ContentCSR from "@/app/blog/[path]/components/contentCSR";
import {isBlogInfoType} from "@/utils/typeChecker";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import {getServerSession, Session} from "next-auth";
import {Button} from "@/components/button/button";
import Link from "next/link";
import Loading from "@/app/loading";
import {blogInfoType} from "blog-types";
import {getBlog} from "@/service/BlogService";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import Comments from "@/components/comments/comments";
import HeaderCSR from "@/app/blog/[path]/components/headerCSR";
import ResourceCSR from "@/app/blog/[path]/components/ResourceCSR";

interface BlogPageProps {
    params : {path : string}
    searchParams?: { data : string }
}

export async function generateMetadata({ params }: BlogPageProps) {
    try {
        const data : {id: string, title: string, subtitle: string} = await getBlog(params.path, ["title", "subtitle"])
        return {
            title: data.title,
            description: data.subtitle, // ADD TAGS
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
    return (
        <>
            <main>
                <section>
                    <Suspense fallback={<Loading size={"MEDIUM"} /> }>
                        <HeaderSSR path={params.path} searchParams={searchParams}/>
                    </Suspense>
                </section>

                {/*elements inside ContentCSR are sections*/}
                <Suspense fallback={<Loading size={"LARGE"} />}>
                    <ContentSSR path={params.path}/>
                </Suspense>

                <section>
                    <SecondaryTitle text={"Comments"} />
                    <Suspense fallback={<Loading size={"MEDIUM"} />}>
                        <CommentsSSR path={params.path}/>
                    </Suspense>
                </section>

                <section>
                    <SecondaryTitle text={"References"} />
                    <Suspense fallback={<Loading size={"SMALL"}/>} >
                        <ResourceSSR path={params.path} />
                    </Suspense>
                </section>
            </main>
        </>
    )
}

async function HeaderSSR({path, searchParams} : {path: string, searchParams: { data : string } | undefined}) {
    const data : blogInfoType = searchParams?.data != undefined
        ? (isBlogInfoType(JSON.parse(searchParams.data)) ? JSON.parse(searchParams.data)
            : await getBlog(path, ["title", "subtitle", "createdAt", "tags", "author"]))
        : await getBlog(path, ["title", "subtitle", "createdAt", "tags", "author"]);

    return <HeaderCSR path={path} data={data}/>
}

async function ContentSSR({path} : {path: string}) {
    const data = await getBlog(path, ["introduction", "body", "conclusion", "faqs"]);
    return <ContentCSR data={data}/>
}

async function CommentsSSR({path} : {path: string}) {
    const data = await getBlog(path, ["comments"]);
    const session = await getServerSession()

    return (
        <Comments commentsList={data.comments} currUserId={session?.user.id} blogId={data.id} />
    )
}

async function ResourceSSR({path} : {path: string}) {
    const data = await getBlog(path, ["resources"]);
    return <ResourceCSR data={data}/>
}