'use client';

import React, {useRef} from "react";
import HtmlContainer from "@/components/htmlContainer/htmlContainer";
import Index from "@/components/index";
import CollapsibleMenu from "@/components/collapsibleMenu/collapsibleMenu";
import Comments from "@/components/comments/comments";

interface ContentCSRProps {
    data : {id: string, introduction: string, body: string, conclusion: string}
}

export default function ContentCSR({ data } : ContentCSRProps) {
    const bodyRef = useRef(null)

    return (
        <>
            <section>
                <HtmlContainer html={data.introduction} />
            </section>

            {/*match the margin associated to paragraphs tag in global.css*/}
            <section style={{marginBottom: "1.5rem"}}>
                <Index bodyRef={bodyRef} />
            </section>

            <section ref={bodyRef}>
                <HtmlContainer html={data.body}/>
            </section>

            <section>
                <HtmlContainer html={data.conclusion}/>
            </section>
        </>
    )
}