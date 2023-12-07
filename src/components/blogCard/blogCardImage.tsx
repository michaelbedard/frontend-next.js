'use client'

import {useEffect, useState} from "react";
import Loading from "@/app/loading";
import {imageSourceType} from "blog-types";
import {getBlog} from "@/service/BlogService";

const BlogCardImage = ({ path}: { path: string }) => {
    const [data, setData] = useState<any | null>(
        null
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBlog(path, ["imageSource"]);
                console.log(result)
                setData(result);
            } catch (error) {
                console.error("Error fetching image source:", error);
            }
        };

        fetchData();
    }, [path]);

    if (data === null) {
        return <Loading size={"AUTO"} />
    }

    return (
        <img className={`blog-card__img`} src={data.imageSource} alt="cover" />
        // <div>
        //     {/*{JSON.stringify(data.id)}*/}
        // </div>
    );
}

export default BlogCardImage