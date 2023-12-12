'use client'

import {getBlogList} from "@/service/BlogService";
import BlogListCSR from "@/app/(home)/blogListCSR";


export default async function BlogListSSR() {
    const data = await getBlogList(["path", "title", "subtitle", "createdAt", "tags", "author"])
    return <BlogListCSR data={data} />

}