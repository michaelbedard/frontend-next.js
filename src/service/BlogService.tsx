import axiosInterceptor from "../../axiosInterceptor";

// PUBLIC
export async function getBlogList() : Promise<blogInfoType[]> {
    const response = await axiosInterceptor.get("https://blueprintfactorybackend.online/api/public/getBlogList/info")

    console.log("getBlogList::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function getBlogInfo(path: string) : Promise<blogInfoType> {
    const response = await axiosInterceptor.get("https://blueprintfactorybackend.online/api/public/getBlog/info", {
        params : {
            BLOG_PATH: path
        }
    })

    console.log("getBlogInfo::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

// PRIVATE

// ADMIN