import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {getBlog} from "@/service/BlogService";
import {getTagList} from "@/service/UtilsService";
import BlogEditorCSR from "@/app/auth/admin/dashboard/blog-manager/[path]/components/BlogEditorCSR";
import BlueprintEditorCSR from "@/app/auth/user/dashboard/[slug]/components/BlueprintEditorCSR";
import {getBlueprint} from "@/service/BlueprintService";

interface BlogEditorProps {
    params : {slug : string}
}

export default function BlogEditor({ params } : BlogEditorProps) {
    return (
        <main>
            <PrimaryTitle title={"Blueprint Editor"} />
            <SocialLinksSection />

            {/*sections inside*/}
            <Suspense fallback={<Loading size={"LARGE"} /> }>
                <BlogEditorSSR slug={params.slug}/>
            </Suspense>
        </main>
    )
}

async function BlogEditorSSR({slug} : {slug : string}) {
    const blogData = await getBlueprint(parseInt(slug), ["title", "subtitle", "introduction", "status", "body", "conclusion", "imageSource", "resources", "tags"])
    const tagData = await getTagList();
    return <BlueprintEditorCSR data={blogData} tags={tagData}/>
}
