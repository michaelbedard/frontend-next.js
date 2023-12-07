import useAxios from "@/utils/axiosInterceptor";
import {blogType} from "blog-types";

// PUBLIC
export async function getBlogList(fields : string[]) : Promise<any[]> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get("/public/getBlogList", {
        params : {
            FIELDS: fields.join(',')
        }
    })
    // await new Promise(resolve => setTimeout(resolve, 3000))

    console.log("getBlogList::", response.data.object)
    return response.data === "" ? null : response.data.object
}

export async function getBlog(path: string, fields : string[], token?: string) : Promise<any> {
    const axiosInstance = token ? await useAxios(token) : await useAxios();
    const response = await axiosInstance.get("/public/getBlog", {
        params : {
            PATH: path,
            FIELDS : fields.join(',')
        }
    })

    console.log("getBlog::", response.data.object)
    return response.data === "" ? null : response.data.object
}

// PRIVATE

// ADMIN
export async function getBlogListByStatus(token: string, status: string, fields : string[]) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.get("/admin/getBlogListByStatus", {
        params : {
            STATUS: status,
            FIELDS : fields.join(',')
        }
    })

    console.log("getBlog::", response.data.object.object)
    return response.data === "" ? null : response.data.object
}

export async function createBlog(token: string, path: string) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.post("/admin/createBlog", {}, {
        params : {
            PATH: path,
        }
    })

    console.log("createBlog::", response.data)
    return response.data === "" ? null : response.data
}

export async function updateBlog(token: string, blog: any) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.put("/admin/updateBlog",
        blog
    )

    console.log("updateBlog::", response.data)
    return response.data === "" ? null : response.data
}

export async function deleteBlog(token: string, blogId: number) : Promise<any> {
    const axiosInstance = await useAxios(token);
    const response = await axiosInstance.delete("/admin/deleteBlog", {
        params : {
            BLOG_ID : blogId
        }
    })

    console.log("deleteBlog::", response.data)
    return response.data === "" ? null : response.data
}
