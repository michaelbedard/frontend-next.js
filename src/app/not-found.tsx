
import Styles from "./helper.module.css"
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";

export default function NotFound() {
    return (
        <main>
            <PrimaryTitle title={"ERROR 404: PAGE NOT FOUND"}/>
            <SocialLinksSection />

            <section className={Styles.container}>
                <p>Page Not Found</p>
            </section>

        </main>
    )
}