'use client';

import {getBlogList} from "@/service/BlogService";
import Link from "next/link";
import SearchBar from "@/components/searchBar/searchBar";
import Library from "@/components/library/library";
import {Suspense, useEffect, useState} from "react";
import BlogCard from "@/components/blogCard/blogCard";
import Styles from "./searchLibraryCSR.module.css"
import {Button} from "@/components/button/button";
import {blogInfoType} from "blog-types";

interface SearchLibraryCSRProps {
    blogInfoData : blogInfoType[]
    tagData : tagType[]

}


export default function SearchLibraryCSR({ blogInfoData, tagData } : SearchLibraryCSRProps) {
    const [records, setRecords] = useState<blogInfoType[]>([])
    const [searchText, setSearchText] = useState<string>("")
    const [searchTag, setSearchTag] = useState<tagType | null>(null)

    useEffect(() => {
        let newRecords = blogInfoData;
        newRecords = newRecords.filter(record =>
            record.title.toLowerCase().includes(searchText.toLowerCase())
            || record.subtitle.toLowerCase().includes(searchText.toLowerCase()))

        if (searchTag) {
            newRecords = newRecords.filter(record =>
                record.tags.some(tag => tag.id === searchTag.id)
            );
        }

        setRecords(newRecords)
    }, [searchText, searchTag])

    function handleSearchTagClick(TagId : number) {
        if (searchTag?.id === TagId) {
            setSearchTag(null)
        } else {
            setSearchTag(tagData.filter(tag => tag.id === TagId)[0])
        }
    }

    function handleChange(inputText: string) {
        setSearchText(inputText)
    }

    return (
        <>
            <section className={Styles.options}>
                <SearchBar onChange={handleChange}/>

                <div className={Styles.tags}>
                    {tagData.map((tag, index) => {
                        let active = false
                        if (searchTag !== null) {
                            active = tag.id === searchTag?.id;
                        }


                        return (
                            <Button
                                key={index}
                                label={tag.name}
                                onClick={() => handleSearchTagClick(tag.id)}
                                isActive={active}
                            />
                        )
                    })}
                </div>
            </section>
            <section>
                <Library
                    data={records}
                    renderCard={(data) => (
                        <BlogCard data={data} href={`blog/${data.path}`}/>
                    )}
                    recordsPerPage={6}
                    showNav={true}
                />
            </section>
        </>
    )
}