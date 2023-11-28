'use client';

import React, {ReactNode} from "react";
import {Button} from "@/components/button/button";
import Styles from "./infoCard.module.css"
import { useRouter } from "next/navigation";


interface InfoCardProps {
    title: string
    body: string
    image: ReactNode
    btnText?: string
    href ?: string
    style?: React.CSSProperties
}

export default function InfoCard({title, body, image, href, btnText, style} : InfoCardProps) {
    const router = useRouter();

    return (
        <div className={Styles.container} style={style}>
            <div className={Styles.imageContainerOuter}>
                <div className={Styles.imageContainerInner}>
                    {image}
                </div>
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            {(btnText && href) && (
                <Button label={btnText} onClick={() => router.push(href)} style={{width: "150px"}}/>
            )}
        </div>
    )
}