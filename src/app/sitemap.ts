import {now} from "next-auth/client/_utils";
import {getBlogList} from "@/service/BlogService";
import {getBlueprintList} from "@/service/BlueprintService";


export default async function sitemap() {
    const baseUrl = "https://blueprintfactory.blog"

    const blogListData = await getBlogList(["path"]);
    const blogUrls = blogListData.map((blog) => {
        return {
            url: `${baseUrl}/blog/${blog.path}`,
            lastModified: new Date()
        }
    }) ?? [];

    // const blueprintListData = await getBlueprintList(["createdAt"]);
    // const blueprintUrls = blueprintListData.map((blueprint) => {
    //     return {
    //         url: `${baseUrl}/blueprint/${blueprint.id}`,
    //         lastModified: new Date()
    //     }
    // }) ?? [];

    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/blueprint`,
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
            url: `${baseUrl}/info/references`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/info/terms-and-condition`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/info/cookies`,
            lastModified: new Date()
        },
        ...blogUrls,
        // ...blueprintUrls
    ]
}