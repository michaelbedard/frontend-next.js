'use client';

import React, {useRef} from "react";
import HtmlContainer from "@/components/htmlContainer/htmlContainer/htmlContainer";
import Index from "@/components/index";
import CollapsibleMenu from "@/components/collapsibleMenu/collapsibleMenu";
import Comments from "@/components/comments/comments";

interface ContentCSRProps {
    data : blogContentType
}

export default async function ContentCSR({ data } : ContentCSRProps) {
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

            <section style={{marginBottom: "1.5rem"}}>
                <CollapsibleMenu items={data.faqs} />
            </section>

            <section>
                <HtmlContainer html={data.conclusion}/>
            </section>
        </>
    )
}