import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {getBlogListByStatus} from "@/service/BlogService";
import {getServerSession, Session} from "next-auth";
import BlogListByStatusCSR from "@/app/auth/admin/dashboard/blog-manager/components/BlogListByStatusCSR";
import CreateBlogBtnCSR from "@/app/auth/admin/dashboard/blog-manager/components/createBlogBtnCSR";


export default async function BlogManager() {
    return (
        <main>
            <PrimaryTitle title={"BLOG MANAGER"} />
            <SocialLinksSection />

            <section>
                <CreateBlogBtnCSR />
            </section>

            <section>
                <SecondaryTitle text={"Public Blog"} />
                <BlogListByStatusCSR status={"PUBLIC"}/>
            </section>

            <section>
                <SecondaryTitle text={"Private Blog"} />
                <BlogListByStatusCSR status={"PRIVATE"}/>
            </section>
        </main>
    )
}

