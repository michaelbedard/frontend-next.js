import Comments from "@/components/comments/comments";
import React from "react";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import {getBlogComments, getBlogContent} from "@/service/BlogService";
import {getServerSession} from "next-auth";


export default async function CommentsSSR({path} : {path: string}) {
    const data: {id: string, comments: blogCommentType[]} = await getBlogComments(path);
    const session = await getServerSession()

    return (
        <>
            <SecondaryTitle text={"Comments"} />
            <section>
                <section>
                    <Comments commentsList={data.comments} currUserId={session?.user.id} blogId={data.id} />
                </section>
            </section>
        </>
    )
}