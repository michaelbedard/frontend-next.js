import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import React, {Suspense} from "react";
import Styles from "../../../blog/[path]/components/heaserSSR.module.css"
import Loading from "@/app/loading";
import Chip from "@/components/chip/chip";
import {blogInfoType} from "blog-types";
import {getBlog} from "@/service/BlogService";
import {getBlueprint} from "@/service/BlueprintService";

interface HeaderSSRProps {
    id: string
    data : blogInfoType
}

export default async function HeaderCSR({id, data} : HeaderSSRProps) {
    const formattedDate = new Date(data.createdAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });

    return (
        <>
            <PrimaryTitle title={data.title} subtitle={data.subtitle} center={true}/>
            <div className={Styles.container}>
                <div className={Styles.image}>
                    <ul>
                        {data.tags.map((tag, index) => (
                            <li  key={index}>
                                <Chip text={tag.name} style={{marginBottom: "5px", marginRight: "5px"}}/>
                            </li>
                        ))}
                    </ul>
                    <Suspense fallback={<Loading size={"AUTO"}/>}>
                        <Image id={id} alt={data.title} />
                    </Suspense>
                </div>
                <div className={Styles.info} >
                    <div>
                        Written By : <span>{data.author.name}</span>
                    </div>
                    <div>
                        <span> {formattedDate} </span>
                    </div>
                </div>
            </div>
        </>
    )
}

async function Image({id, alt} : {id: string, alt : string}) {
    const data = await getBlueprint(parseInt(id), ["imageSource"]);
    return (
        <img alt={alt} src={data.imageSource}/>
    )
}