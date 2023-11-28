'use client';

import Library from "@/components/library/library";
import BlogCard from "@/components/blogCard/blogCard";
import {Button} from "@/components/button/button";
import { useRouter} from "next/navigation";

interface LibraryComponentProps {
    data : any[]
}

export default function BlogListCSR({data} : LibraryComponentProps) {
    const router = useRouter()

    return (
        <div>
            <Library
                data={data}
                renderCard={(data) => (
                    <BlogCard data={data}/>
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