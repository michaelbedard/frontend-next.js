import axios from 'axios';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {useSession} from "next-auth/react";

const getInstance = (token: string | undefined) => {
    const axiosApiInstance = axios.create({
        baseURL: 'https://blueprintfactorybackend.online/api',
        // baseURL: 'http://localhost:8080/api',
    });

    axiosApiInstance.interceptors.request.use((config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            if (config.method && ['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
                console.log("ITS NOT A GET REQUEST")
                config.headers['Content-Type'] = 'application/json';
            }
            return config
        },
        (error) => {
            Promise.reject(error)
        }
    )

    axiosApiInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosApiInstance
}

export default async function useAxios(token?: string) {
    return getInstance(token)
}