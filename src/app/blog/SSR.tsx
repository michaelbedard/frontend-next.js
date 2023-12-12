'use client';

import {getBlogList} from "@/service/BlogService";
import {getTagList} from "@/service/UtilsService";
import SearchLibraryCSR from "@/app/blog/searchLibraryCSR/searchLibraryCSR";


export default async function SearchLibrarySSR() {
    const blogInfoData = await getBlogList(["path", "title", "subtitle", "createdAt", "tags", "author"])
    const tagData = await getTagList()

    return <SearchLibraryCSR blogInfoData={blogInfoData} tagData={tagData}/>

}