import {ReactNode} from "react";
import Styles from "./htmlContainer.module.css"

interface HtmlContainerProps {
    html : string
}

export default function HtmlContainer({ html } : HtmlContainerProps) {
    // removes empty paragraphs
    const modifiedHtml = html.replace(/<p>\s*&nbsp;\s*<\/p>/g, '');

    return (
        <div className={Styles.container} dangerouslySetInnerHTML={{ __html: modifiedHtml }}></div>
    )
}