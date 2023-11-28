import PrimaryTitle from "@/components/primaryTitle/primaryTitle";
import React, {Suspense} from "react";
import {getBlogImageSource, getBlogInfo} from "@/service/BlogService";
import Styles from "./heaserSSR.module.css"
import Loading from "@/app/loading";
import Chip from "@/components/chip/chip";

interface HeaderSSRProps {
    path : string
    data : blogInfoType | null
}

export default async function HeaderSSR({path, data} : HeaderSSRProps) {
    if (data == null) {
        data = await getBlogInfo(path)
    }

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
                        <ImageSSR path={path} alt={data.title} />
                    </Suspense>
                </div>
                <div className={Styles.info} >
                    <div>
                        Written By : <span>{data.author.name}</span>
                    </div>
                    <div>
                        <span> {new Date(data.createdAt).toLocaleDateString()} </span>
                    </div>
                </div>
            </div>
        </>
    )
}

async function ImageSSR({path, alt} : {path: string, alt : string}) {
    const imageSource = await getBlogImageSource(path);
    return (
        <img alt={alt} src={imageSource.imageSource}/>
    )
}