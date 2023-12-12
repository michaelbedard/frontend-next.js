import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import {useSession} from "next-auth/react";
import InfoCard from "@/components/infoCard/infoCard";
import Library from "@/components/library/library";
import {Suspense} from "react";
import BlogListCSR from "@/app/(home)/blogListCSR";
import Loading from "@/app/loading";
import {getBlogList} from "@/service/BlogService";
import CollapsibleMenu from "@/components/collapsibleMenu/collapsibleMenu";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import JoinNewsletter from "@/components/joinNewsletter/joinNewsletter";
import PresentationCard from "@/components/presentationCard/presentationCard";
import BlogListSSR from "@/app/(home)/Temp";

export const metadata = {
    title: "Home Page",
    description: "Explore the world of money making online"
}


export default function Home() {

    return (
        <main>
            <BackgroundImage alt={"cover Image"} imageSource={"../../assets/home_img.png"} />
            <PrimaryTitle title={"HOME PAGE"} subtitle={"SUBTITLE btitles are text representing the contents of the audio in a film, television show, opera or other audiovisual media. Subtitles might provide a transcription or translation of spoken dial"} />
            <SocialLinksSection />

            <section>
                <SecondaryTitle text={"Newsletter"} />
                <JoinNewsletter />
            </section>

            <section>
                <SecondaryTitle text={"Take Action"} />
                <div className={"infoCardContainer"}>
                    <InfoCard
                        title={"WATCH"}
                        body={"Didn't found what you're looking for? Maybe we had it cover in our youtube channel!"}
                        image={<img src={"../../assets/facebook.png"} alt={"visit youtube"}/>}
                        btnText={"Watch"}
                        href={"/youtube"}
                    />
                    <InfoCard
                        title={"WRITE"}
                        body={"You have a great idea? or something to say? Write me! I will respond to every message"}
                        image={<img src={"../../assets/pencil.png"} alt={"write us"} /> }
                        btnText={"Write"}
                        href={"/about-us"}
                    />
                    <InfoCard
                        title={"READ"}
                        body={"Blogs are the best way to quickly get an insight on a subject.  So why not readding one?"}
                        image={<img src={"../../assets/book.png"} alt={"read blog post"}/> }
                        btnText={"Read"}
                        href={"/blog/library"}
                    />
                </div>
            </section>

            <section>
                <SecondaryTitle text={"Popular Blogs"} />
                <Suspense fallback={<Loading size={"LARGE"}/>}>
                    <BlogListSSR />
                </Suspense>
            </section>

        </main>
    )
}