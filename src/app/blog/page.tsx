import type { Metadata} from "next";
import {Suspense} from "react";
import SearchLibraryCSR from "@/app/blog/searchLibraryCSR/searchLibraryCSR";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getBlogList} from "@/service/BlogService";
import Loading from "@/app/loading";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import {getTagList} from "@/service/UtilsService";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";

export const metadata : Metadata = {
    title: "blog page",
    description: "XXX"
}

export default async function UserPage() {

    return (
        <main>
            <BackgroundImage alt={"background image"} imageSource={"../../assets/blog_library_img.png"} />
            <PrimaryTitle title={"ALL BLOGS"} />
            <SocialLinksSection />

            <SecondaryTitle text={"All Blogs"} />
            <Suspense fallback={<Loading size={"LARGE"} /> }>
                <SearchLibrarySSR />
            </Suspense>
        </main>
    )
}

async function SearchLibrarySSR() {
    const blogInfoData = await getBlogList()
    const tagData = await getTagList()

    return <SearchLibraryCSR blogInfoData={blogInfoData} tagData={tagData}/>

}