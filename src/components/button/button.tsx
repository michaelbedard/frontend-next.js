'use client';

import React, {Component, ReactNode, useEffect, useRef, useState} from "react";
import styles from "./button.module.css"

interface ButtonProps {
    label: string
    onClick: () => void
    isActive?: boolean
    style?: React.CSSProperties
    image?: ReactNode
}

export class Button extends Component<ButtonProps> {
    render() {
        let {label, onClick, image, style, isActive} = this.props;

        return (
            <div className={`${styles.container} ${isActive ? styles.active : ""}`} onClick={onClick} style={style}>
                <span>{label}</span>
                {image && (
                    image
                )}
            </div>
        )
    }
}