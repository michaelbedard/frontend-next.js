import useAxios from "../utils/axiosInterceptor";


export async function login(email:string, password: string): Promise<any> {
    const axiosInstance = await useAxios();

    const response = await axiosInstance.post("/public/login", {email, password});
    console.log("login::" + JSON.stringify(response.data))
    return response.data;
}