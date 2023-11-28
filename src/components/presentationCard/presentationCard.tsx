import {ReactNode} from "react";
import Styles from "./presentationCard.module.css"

interface PresentationCardProps {
    children : ReactNode
    image : ReactNode
    reverse ?: boolean
}

export default function PresentationCard({ children, image, reverse } : PresentationCardProps) {

    // if reverse, show only upperImage
    return (
        <div className={Styles.container}>
            {reverse ? (
                <div>{image}</div>
            ): (
                <div className={Styles.upperImage}>{image}</div>
            )}
            <div className={Styles.text}>
                {children}
            </div>
            {!reverse && <div className={Styles.lowerImage}>{image}</div>}
        </div>
    )
}