import PresentationCard from "@/components/presentationCard/presentationCard";
import BackgroundImage from "@/components/backgroundImage/backgroundImage";
import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import SocialLinksSection from "@/components/socialLinksSection/socialLinksSection";
import SecondaryTitle from "@/components/secondaryTitle/secondaryTitle";
import InfoCard from "@/components/infoCard/infoCard";
import ContactForm from "@/components/contactForm/contactForm";

export const metadata = {
    title: "XXX",
    description: "XXX"
}

export default function AboutUs() {
    return (
        <main>
            <BackgroundImage alt={"background image"} imageSource={"../../assets/logo.png"} />
            <PrimaryTitle title={"ABOUT US"} />
            <SocialLinksSection />

            <section>
                <SecondaryTitle text={"About me, the founder"} />
                <PresentationCard image={<img alt={"home presentation image"} src={"../../assets/my-self.jpg"}/>}>
                    <p>
                        Hello, nice to meet you! My name is Michaël Bédard and I am a 20 years old McGill student.  My studies focus on Physics and Computer Science,
                        but my interests are far beyond than that : finance, marketing, sports, game-board, psychology, bodybuilding, etc.
                        Sounds fun to you too? Then you are at the right place!
                    </p>
                    <p style={{marginBottom: "0"}}>
                        In this blog, expect to find everything you need to learn things by your own. This includes the different possibles approach & tactics, different subjects and different tools.
                        I also have a youtube chanel were I post more fun videos about my self-teaching process.  Happy learning!
                    </p>
                </PresentationCard>
            </section>
            <section>
                <SecondaryTitle text={"Our Values"} />
                <div className={"infoCardContainer"}>
                    <InfoCard
                        title={"WORK"}
                        body={"work will always surpass talent. Work hard everyday and success is guaranteed!"}
                        image={<img src={"../../assets/struggle.png"} alt={"work image"}/>}
                    />
                    <InfoCard
                        title={"THINK BIG"}
                        body={"This world is just a big sandbox where you can you whatever you want, so don't limit yourself"}
                        image={<img src={"../../assets/big-idea.png"} alt={"think big image"} /> }
                    />
                    <InfoCard
                        title={"DO IT"}
                        body={"Great ideas don't magically appears, they come by doing stuff, and by making those stuff better"}
                        image={<img src={"../../assets/document.png"} alt={"do it"}/> }
                    />
                </div>
            </section>
            <section>
                <SecondaryTitle text={"Contact Us"}/>
                <p>
                    Feel free to contact me! Please tell me what I can improve, what need to be done or what bug need to be fixed.  I will read every message and reply to you as fast as possible.
                </p>
                <ContactForm />
            </section>
        </main>
    )
}