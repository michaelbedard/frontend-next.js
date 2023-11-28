import useAxios from "@/utils/axiosInterceptor";

// PUBLIC
export async function getBlogList() : Promise<blogInfoType[]> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("https://blueprintfactorybackend.online/api/public/getBlogList/info")
    // await new Promise(resolve => setTimeout(resolve, 3000))

    console.log("getBlogList::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function getBlog(path: string) : Promise<blogType> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("https://blueprintfactorybackend.online/api/public/getBlog", {
        params : {
            BLOG_PATH: path
        }
    })

    console.log("getBlog::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function getBlogInfo(path: string) : Promise<blogInfoType> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("https://blueprintfactorybackend.online/api/public/getBlog/info", {
        params : {
            BLOG_PATH: path
        }
    })

    console.log("getBlogInfo::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function getBlogImageSource(path: string) : Promise<blogImageSourceType> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("https://blueprintfactorybackend.online/api/public/getBlog/imageSource", {
        params : {
            BLOG_PATH: path
        }
    })

    console.log("getBlogImageSource::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function getBlogContent(path: string) : Promise<blogContentType> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("https://blueprintfactorybackend.online/api/public/getBlog/content", {
        params : {
            BLOG_PATH: path
        }
    })

    console.log("getBlogContent::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

export async function getBlogComments(path: string) : Promise<{id: string, comments: blogCommentType[]}> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("https://blueprintfactorybackend.online/api/public/getBlog/comment", {
        params : {
            BLOG_PATH: path
        }
    })

    console.log("getBlogComments::" + JSON.stringify(response.data))
    return response.data === "" ? null : response.data
}

// PRIVATE

// ADMIN