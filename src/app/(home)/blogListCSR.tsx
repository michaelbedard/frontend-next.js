'use client';

import Library from "@/components/library/library";
import BlogCard from "@/components/blogCard/blogCard";
import {Button} from "@/components/button/button";
import { useRouter} from "next/navigation";
import {getBlogList} from "@/service/BlogService";
import {blogInfoType} from "blog-types";

interface LibraryComponentProps {
    data : blogInfoType[]
}

export default function BlogListCSR({data} : LibraryComponentProps) {
    const router = useRouter()

    return (
        <div>
            <Library
                data={data}
                renderCard={(data) => (
                    <BlogCard data={data} href={`blog/${data.path}`}/>
                )}
                recordsPerPage={3}
                showNav={false}
            />
            <div>
                <Button
                    label={"Show All"}
                    onClick={() => router.push("/blog")}
                    style={{marginTop: "30px"}}
                    image={<img src={"../../assets/single_arrows.png"} alt={"see all blogs"}/>}
                />
            </div>
        </div>
    )
}