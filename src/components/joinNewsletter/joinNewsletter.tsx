'use client';

import Styles from "./joinNewsletter.module.css"
import {Button} from "@/components/button/button";
import {signIn} from "next-auth/react";

export default function JoinNewsletter() {

    return (
        <div className={Styles.container}>
            <Button label={"Join Newsletter Now!"} onClick={() => signIn()} style={{width: "100%"}} image={<img src={"../../../assets/paper.png"} alt={"paper"} />}/>
            <p>
                Join our Newsletter to get the latest news about content marketing!
            </p>
        </div>
    )
}