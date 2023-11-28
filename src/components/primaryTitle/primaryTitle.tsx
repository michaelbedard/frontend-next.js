'use client';

import Styles from "./primaryTitle.module.css"
import {useEffect, useRef, useState} from "react";

interface PrimaryTitleProps {
    title: string
    subtitle?: string
    center?: boolean
}

export default function PrimaryTitle({title, subtitle, center} : PrimaryTitleProps) {
    const [isOverflow, setIsOverflow] = useState(false);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        function checkHeight() {
            const h1Element = h1Ref.current;
            const h2Element = h2Ref.current;

            if (h1Element && h2Element) {
                const combinedHeight = h1Element.clientHeight + h2Element.clientHeight;

                if (combinedHeight > (window.innerHeight * 0.48) && h2Element.clientHeight > 30) {
                    setIsOverflow(true);
                } else {
                    setIsOverflow(false);
                }
            }
        }
        checkHeight();
    }, [title, subtitle]);

    return (
        <section className={`${Styles.container} ${center ? Styles.center : ""}`}>
            <h1 ref={h1Ref}><span>{title}</span></h1>
            {subtitle &&
                <h2 ref={h2Ref} className={isOverflow ? Styles.isOverflow : ""}>{subtitle}</h2>
            }
        </section>
    )
}