import {now} from "next-auth/client/_utils";
import {getBlogList} from "@/service/BlogService";


export default async function sitemap() {
    const baseUrl = "https://blueprintfactory.blog"

    const blogListData = await getBlogList();
    const blogUrls = blogListData.map((blog) => {
        return {
            url: `${baseUrl}/blog/${blog.path}`,
            lastModified: new Date()
        }
    }) ?? [];

    return [
        {
            url: `${baseUrl}/home`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/auth`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/references`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/terms-ans-condition`,
            lastModified: new Date()
        },
        ...blogUrls
    ]
}