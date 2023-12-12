import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import CallToActionCSR from "@/app/blueprints/CallToActionCSR";
import {Suspense} from "react";
import BlueprintListCSR from "@/app/blueprints/BlueprintListCSR";
import {getBlueprintList} from "@/service/BlueprintService";
import {blueprintInfoType} from "blueprint-types";
import BlueprintListSSR from "@/app/blueprints/Temp";


export default function AllBlueprints() {


    return (
        <main>
            <BackgroundImage alt={"bck img"} imageSource={"../../assets/pencil.png"} />
            <PrimaryTitle title={"ALL BLUEPRINTS"} />
            <SocialLinksSection />

            <section>
                <SecondaryTitle text={"Disclaimer"} />
                <img style={{height: "60px", marginBottom: "20px"}} alt={"danger"} src={"../../assets/alert.png"} />
                <p style={{textAlign: "center"}}>
                    This page is not finish! (and neither the rest of the website)
                    Please let me know what tool/service you, as a person or as a group, need to start your project.  We aim to help you from the initial idea to finalisation by promoting your project, validating your ideas, managing your team, finding coworkers/investors, and so much more!!
                </p>
            </section>

            <section>
                <SecondaryTitle text={"Create a Blueprint"} />
                <CallToActionCSR />
            </section>

            <section>
                <SecondaryTitle text={"All Blueprints"} />
                <Suspense>
                    <BlueprintListSSR />
                </Suspense>
            </section>


        </main>
    )
}