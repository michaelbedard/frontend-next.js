'use client';

import {Suspense, useEffect, useState} from "react";
import Loading from "@/app/loading";
import {getBlog} from "@/service/BlogService";
import {getBlueprint} from "@/service/BlueprintService";

const BlueprintCardImageDELETE = ({ id }: { id: string }) => {
    const [data, setData] = useState<any | null>(
        null
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBlueprint(parseInt(id), ["imageSource"]);
                console.log(result)
                setData(result);
            } catch (error) {
                console.error("Error fetching image source:", error);
            }
        };

        fetchData();
    }, [id]);

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

export default BlueprintCardImageDELETE