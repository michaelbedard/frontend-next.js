'use client';

import { useRouter } from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import Chip from "@/components/chip/chip";
import Styles from "./blogCard.module.css"
import Loading from "@/app/loading";
import Link from "next/link";
import {format} from "util";
import {blogInfoType} from "blog-types";
import BlogCardImage from "@/components/blogCard/blogCardImage";
import BlueprintCardImageDELETE from "@/components/blogCard/BlueprintCardImageDELETE";

interface BlogCardProps {
    data: blogInfoType
    href: string
    isBlueprint ?: boolean
}

const BlogCard = ({data, href, isBlueprint} : BlogCardProps) => {
    const formattedDate = new Date(data.createdAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });

    return (
        <Link className={Styles.container} href={{pathname : href, query: {
            data: JSON.stringify(data)
        }}}>
            <div className={Styles.cover}>
                <Suspense fallback={<Loading size={"AUTO"} />}>
                    {isBlueprint ? (
                        <BlueprintCardImageDELETE id={data.id}/>
                    ):(
                        <BlogCardImage path={data.path}/>
                    )}
                </Suspense>
                <ul>
                    {data.tags.map((tag, index) => (
                        <li key={index}>
                            <Chip
                                text={tag.name}
                                style={{marginRight: "5px"}}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={Styles.content}>
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>

                <footer>
                    <div>
                        <h6>{data.author.name}</h6>
                        <div>{formattedDate}</div>
                    </div>
                    <img src={"../../../assets/single_arrows.png"} alt={"go to blog post"}/>
                </footer>
            </div>
        </Link>
    )
}

export default BlogCard