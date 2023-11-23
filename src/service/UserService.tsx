import {User} from "next-auth";
import axiosInterceptor from "../../axiosInterceptor";


export async function login(email:string, password: string): Promise<userType> {
    const response = await axiosInterceptor.post("/public/login", {email, password});
    console.log("login::" + JSON.stringify(response.data))
    return response.data;
}