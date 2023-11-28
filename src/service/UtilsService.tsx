import useAxios from "@/utils/axiosInterceptor";

export async function getTagList(): Promise<tagType[]> {
    const axiosInstance = await useAxios();
    const response = await axiosInstance.get('/public/getTagList')
    console.log("getTagList::" + JSON.stringify(response.data))
    return response.data;
}