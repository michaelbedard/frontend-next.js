import {getBlog} from "@/service/BlogService";
import React, {Suspense} from "react";
import Loading from "@/app/loading";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import {blogInfoType} from "blog-types";
import {isBlogInfoType} from "@/utils/typeChecker";
import {getBlueprint} from "@/service/BlueprintService";
import {getServerSession} from "next-auth";
import Comments from "@/components/comments/comments";
import ContentCSR from "@/app/blueprints/[slug]/components/ContentCSR";
import HeaderCSR from "@/app/blueprints/[slug]/components/headerCSR";
import ResourceCSR from "@/app/blueprints/[slug]/components/ResourceCSR";


interface BlueprintPageProps {
    params : {slug : string}
    searchParams?: { data : string }
}

export default function BlueprintPage({ params, searchParams } : BlueprintPageProps) {
    return (
        <main>
            <section>
                <Suspense fallback={<Loading size={"MEDIUM"} /> }>
                    <HeaderSSR slug={params.slug} searchParams={searchParams}/>
                </Suspense>
            </section>

            {/*elements inside ContentCSR are sections*/}
            <Suspense fallback={<Loading size={"LARGE"} />}>
                <ContentSSR slug={params.slug}/>
            </Suspense>

            <section>
                <SecondaryTitle text={"Comments"} />
                <Suspense fallback={<Loading size={"MEDIUM"} />}>
                    <CommentsSSR slug={params.slug}/>
                </Suspense>
            </section>

            <section>
                <SecondaryTitle text={"References"} />
                <Suspense fallback={<Loading size={"SMALL"}/>} >
                    <ResourceSSR slug={params.slug} />
                </Suspense>
            </section>
        </main>
    )
}

async function HeaderSSR({slug, searchParams} : {slug: string, searchParams: { data : string } | undefined}) {
    const data : blogInfoType = await getBlueprint(parseInt(slug), ["title", "subtitle", "createdAt", "tags", "author"]);
    return <HeaderCSR id={slug} data={data}/>
}

async function ContentSSR({slug} : {slug: string}) {
    const data = await getBlueprint(parseInt(slug), ["introduction", "body", "conclusion", "faqs"]);
    return <ContentCSR data={data}/>
}

async function CommentsSSR({slug} : {slug: string}) {
    const data = await getBlueprint(parseInt(slug), ["comments"]);
    const session = await getServerSession()

    return (
        <Comments commentsList={data.comments} currUserId={session?.user.id} blogId={data.id} />
    )
}

async function ResourceSSR({slug} : {slug: string}) {
    const data = await getBlueprint(parseInt(slug), ["resources"]);
    return <ResourceCSR data={data}/>
}