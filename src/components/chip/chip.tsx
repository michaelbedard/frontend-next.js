
import Styles from "./chip.module.css"
import React from "react";

interface ChipProps {
    text: string
    style: React.CSSProperties
}

export default function Chip({text, style} : ChipProps) {
    return (
        <div className={Styles.container} style={style}>
            {text}
        </div>
    )
}