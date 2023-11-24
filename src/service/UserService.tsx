import {User} from "next-auth";
import axiosInterceptor from "../utils/axiosInterceptor";


export async function login(email:string, password: string): Promise<any> {
    const response = await axiosInterceptor.post("/public/login", {email, password});
    console.log("login::" + JSON.stringify(response.data))
    return response.data;
}