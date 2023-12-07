'use client';

import Link from "next/link";

interface ResourceCSR {
    data: {resources : resourceType[]}
}

export default function ResourceCSR({data} : ResourceCSR) {

    return (
        <div style={{width: "100%", justifyContent: "start"}}>
            {data.resources.map((resource, index) => {
                return (
                    <Link href={resource.link} key={index}>{resource.text}</Link>
                )
            })}
        </div>
    )
}