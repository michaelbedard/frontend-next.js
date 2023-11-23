import {getBlogList} from "@/service/BlogService";
import Link from "next/link";

interface blogPageProps {
    params : {path : string}
}


export default async function Library() {
    const blogListData = await getBlogList();


    return (
        <div>
            {blogListData.map(blog => {
                return (
                    <>
                        <p key={blog.id}>
                            <Link href={`/blog/${blog.path}`}> {blog.title} </Link>
                        </p>
                    </>
                )
            })}
        </div>
    )
}