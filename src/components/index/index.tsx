'use client';

import React, {useEffect, useRef, useState} from "react";
import Styles from "./index.module.css"

interface IndexProps {
    bodyRef : React.RefObject<HTMLElement>;
}

export default function Index({bodyRef} : IndexProps) {
    const [titleElements, setTitleElements] = useState<NodeListOf<HTMLHeadingElement> | null>(null)
    const indexRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (bodyRef && bodyRef.current) {
            const h3Tags = bodyRef.current.querySelectorAll('h3');
            setTitleElements(h3Tags)
        }
    }, [bodyRef]);

    const handleHeaderClick = (index: number) => {

        if (titleElements && titleElements.length > index) {
            const yOffset = -10;
            const y = titleElements[index].getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.content} ref={indexRef}>
                <ol>
                    {titleElements !== null &&
                        Array.from(titleElements).map((titleElement, index) => {
                            return (
                                <li key={index} onClick={() => handleHeaderClick(index)}>
                                    {(index + 1) + ". " + titleElement.textContent}
                                </li>
                            )
                        })}
                </ol>
            </div>
            <div className={Styles.shadow}/>
        </div>
    )
}