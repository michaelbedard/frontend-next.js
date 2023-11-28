'use client';

import {Button} from "@/components/button/button";
import Styles from "./socialLinksSection.module.css"

export default function SocialLinksSection() {
    const handleNavigate = () => {
        window.open("https://www.youtube.com/@BlueprintFactory", "_blank");
    };

    return (
        <>
            <section className={Styles.container}>
                <Button
                    label={"Follow me on Youtube!"}
                    onClick={handleNavigate}
                    image={<img alt={"follow us on youtube"} src={"../../../assets/facebook.png"}/>}
                    style={{width: "min(500px, 100%)"}}
                />
            </section>
            <div style={{height: "20px"}} />
        </>
    )
}