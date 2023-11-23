'use client';

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from "./subTitle.module.css"


type SubTitleProps = {
    text :string
}

const SubTitle = ({text}: SubTitleProps) => {

    const handleClick = () => {
        const element = document.getElementById(`sub-title-${text}`);

        if (element) {
            const yOffset = -10;
            const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

            if ('scrollTo' in window) {
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    return (
        <div
            id={`sub-title-${text}`}
            className={styles.container}
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faEllipsis} />
            <h3>{text}</h3>
            <FontAwesomeIcon icon={faEllipsis} />
        </div>
    )
}

export default SubTitle