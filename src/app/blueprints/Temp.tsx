'use client';

import {getBlueprintList} from "@/service/BlueprintService";
import BlueprintListCSR from "@/app/blueprints/BlueprintListCSR";


export default async function BlueprintListSSR() {
    const data =  await getBlueprintList(["title", "subtitle", "createdAt", "tags", "author"])
    return <BlueprintListCSR data={data}/>
}