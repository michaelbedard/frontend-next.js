import React, {Suspense} from "react";
import Content from "@/app/blog/[path]/content";
import Comments from "@/app/blog/[path]/comments";
import {login} from "@/service/UserService";
import {getBlogInfo} from "@/service/BlogService";

interface BlogPageProps {
    params : {path : string}
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

export default async function BlogPage({ params }: BlogPageProps) {
    // const blogInfoData : blogInfoType = await getBlogInfo(params.path)

    return (
        <>
            <main>
                <section>
                    {params.path}
                    {/*{blogInfoData.title}*/}
                </section>
                <section>
                    <Suspense fallback={<div>LOADING</div>}>
                        <Content />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<div>LOADING</div>}>
                        <Comments />
                    </Suspense>
                </section>
            </main>
        </>
    )
}