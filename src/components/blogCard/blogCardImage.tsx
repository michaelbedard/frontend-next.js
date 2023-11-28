import {getBlogImageSource} from "@/service/BlogService";
import {useEffect, useState} from "react";
import Loading from "@/app/loading";


export function BlogCardImage({ path }: { path: string }) {
    const [imageSource, setImageSource] = useState<blogImageSourceType | null>(
        null
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBlogImageSource(path);
                setImageSource(result);
            } catch (error) {
                console.error("Error fetching image source:", error);
            }
        };

        fetchData();
    }, [path]);

    if (imageSource === null) {
        return <Loading size={"AUTO"} />
    }

    return (
        <img className={`blog-card__img`} src={imageSource.imageSource} alt="cover" />
    );
}