'use client';

import Styles from "./socialLinksSection.module.css"
import Link from "next/link";

export default function SocialLinksSection() {
    const handleNavigate = () => {
        window.open("https://www.youtube.com/@BlueprintFactory", "_blank");
    };

    return (
        <>
            <section className={Styles.container}>
                <Link href={"https://www.facebook.com/BlueprintFactoryBlog"} target="_blank" rel="noopener noreferrer">
                    <img src={"../../../assets/facebook.png"} alt={"join facebook"} />
                </Link>
                <Link href={"https://www.instagram.com/blueprintfactoryblog/"} target="_blank" rel="noopener noreferrer">
                    <img src={"../../../assets/instagram.png"} alt={"join instagram"} />
                </Link>
                <Link href={"https://twitter.com/BlueprintFact"} target="_blank" rel="noopener noreferrer">
                    <img src={"../../../assets/twitter.png"} alt={"join twitter"} />
                </Link>
            </section>
            <div style={{height: "20px"}} />
        </>
    )
}