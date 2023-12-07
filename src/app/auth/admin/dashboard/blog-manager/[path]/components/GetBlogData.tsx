'use client';

import {useSession} from "next-auth/react";
import {getBlog} from "@/service/BlogService";
import {getTagList} from "@/service/UtilsService";
import BlogEditorCSR from "@/app/auth/admin/dashboard/blog-manager/[path]/components/BlogEditorCSR";
import {useEffect, useState} from "react";
import {blogType} from "blog-types";
import Loading from "@/app/loading";

export default function GetBlogData({path} : {path : string}) {
    const [blogData, setBlogData] = useState<blogType | null>(null)
    const [tagData, setTagData] = useState<tagType[] | null>(null)
    const { data : session } = useSession()

    useEffect(() => {
        if (session?.user) {
            getBlog(path, ["path", "title", "subtitle", "introduction", "status", "body", "conclusion", "imageSource", "resources", "tags", "faqs"], session.user.jwtToken)
                .then((r) => {
                    setBlogData(r)
                })
                .catch((e) => {
                    console.log(e)
                })
            getTagList().then((r) => setTagData(r))
        }
    })

    if (blogData != null && tagData != null) {
        return <BlogEditorCSR data={blogData} tags={tagData}/>
    } else {
        return <Loading size={"MEDIUM"} />
    }
}