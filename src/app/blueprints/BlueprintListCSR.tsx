'use client';


import {blueprintInfoType} from "blueprint-types";
import Library from "@/components/library/library";
import BlogCard from "@/components/blogCard/blogCard";

interface BlueprintCSRProps {
    data: blueprintInfoType[];
}

export default function BlueprintListCSR({ data } : BlueprintCSRProps) {

    return (
        <section>
            <Library
                data={data}
                renderCard={(data) => (
                    <BlogCard
                        data={data}
                        href={`blueprints/${data.id}`}
                        isBlueprint={true}
                    />
                )}
                recordsPerPage={6}
                showNav={true}
            />
        </section>
    )
}