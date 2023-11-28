'use client';

import {getBlogImageSource} from "@/service/BlogService";
import { useRouter } from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {BlogCardImage} from "@/components/blogCard/blogCardImage";
import Chip from "@/components/chip/chip";
import Styles from "./blogCard.module.css"
import Loading from "@/app/loading";
import Link from "next/link";
import { format } from 'date-fns';

interface BlogCardProps {
    data : blogInfoType
}

export default function BlogCard({data} : BlogCardProps) {
    const formattedDate = format(new Date(data.createdAt), 'MM/dd/yyyy');

    return (
        <Link className={Styles.container} href={{pathname : `/blog/${data.path}`, query: { data: JSON.stringify(data) } }}>
            <div className={Styles.cover}>
                <Suspense fallback={<Loading size={"AUTO"} />}>
                    <BlogCardImage path={data.path}/>
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