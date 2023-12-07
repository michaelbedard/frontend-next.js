import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import {getBlog} from "@/service/BlogService";
import BlogEditorCSR from "@/app/auth/admin/dashboard/blog-manager/[path]/components/BlogEditorCSR";
import {getTagList} from "@/service/UtilsService";
import {Suspense} from "react";
import Loading from "@/app/loading";

interface BlogEditorProps {
    params : {path : string}
}

export default function BlogEditor({ params } : BlogEditorProps) {
    return (
        <main>
            <PrimaryTitle title={"Blog Editor"} />
            <SocialLinksSection />

            {/*sections inside*/}
            <Suspense fallback={<Loading size={"LARGE"} /> }>
                <BlogEditorSSR path={params.path}/>
            </Suspense>
        </main>
    )
}

async function BlogEditorSSR({path} : {path : string}) {
    const blogData = await getBlog(path, ["path", "title", "subtitle", "introduction", "status", "body", "conclusion", "imageSource", "resources", "tags", "faqs"])
    const tagData = await getTagList();
    return <BlogEditorCSR data={blogData} tags={tagData}/>
}
