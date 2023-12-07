import useAxios from "@/utils/axiosInterceptor";
import {blueprintType} from "blueprint-types";

// PUBLIC
export async function getBlueprintList(fields : string[]) : Promise<any[]> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("/public/getBlueprintList", {
        params : {
            FIELDS: fields.join(',')
        }
    })
    // await new Promise(resolve => setTimeout(resolve, 3000))

    console.log("getBlueprintList::", response.data.object)
    return response.data === "" ? null : response.data.object
}

export async function getBlueprint(id: number, fields : string[]) : Promise<any> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("/public/getBlueprint", {
        params : {
            BLUEPRINT_ID: id,
            FIELDS : fields.join(',')
        }
    })

    console.log("getBlueprint::", response.data.object)
    return response.data === "" ? null : response.data.object
}

// PRIVATE
export async function getBlueprintListByStatusAndByUser(token: string, status: string, fields : string[]) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.get("/private/getBlueprintListByStatusAndByUser", {
        params : {
            STATUS: status,
            FIELDS : fields.join(',')
        }
    })

    console.log("getBlueprintListByStatusAndByUser::", response)
    return response.data === "" ? null : response.data.object
}

export async function createBlueprint(token: string) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.post("/private/createBlueprint")

    console.log("createBlueprint::", response.data.object)
    return response.data === "" ? null : response.data.object
}

export async function updateBlueprint(token: string, blueprint: blueprintType) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.put("/private/updateBlueprint",
        blueprint
    )

    console.log("updateBlueprint::", response.data.object)
    return response.data === "" ? null : response.data.object
}

export async function deleteBlueprint(token: string, blueprintID: number) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.delete("/private/deleteBlueprint", {
        params : {
            BLUEPRINT_ID: blueprintID,
        }
    })

    console.log("deleteBlueprint::", response.data.object)
    return response.data === "" ? null : response.data.object
}


// ADMIN