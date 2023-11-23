'use client';

import {ReactNode, useEffect, useRef, useState} from "react";
import styles from "./button.module.css"

interface ButtonProps {
    label: string
    onClick: () => void
    isActive?: boolean
    style?: React.CSSProperties
    image?: ReactNode
}

export function Button({label, onClick, image, style, isActive}: ButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null)
    const shadowRef = useRef<HTMLDivElement>(null)

    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")

    useEffect(() => {
        const updateDimensions = () => {
            if (buttonRef.current && shadowRef.current) {
                const buttonElement = buttonRef.current;

                setWidth(`${buttonElement.clientWidth}px`);
                setHeight(`${buttonElement.clientHeight}px`);
            }
        };

        updateDimensions(); // Initial dimensions

        // Update dimensions when the window is resized
        window.addEventListener("resize", updateDimensions);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };

    }, []);


    return (
        <div className={styles.container}>
            <div className={`${styles.button} ${isActive ? styles.active : ""}`}
                 onClick={onClick}
                 style={style}
                 ref={buttonRef}
            >
                <div className={styles.label}>
                    {label}
                </div>
                {image && (
                    <div className={styles.image}>
                        {image}
                    </div>
                )}
            </div>
            <div
                className={styles.shadow}
                style={{height: height, width: width}}
                ref={shadowRef}
            />
        </div>
    )
}