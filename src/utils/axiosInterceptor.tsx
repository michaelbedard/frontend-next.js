import axios from 'axios';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

const axiosInterceptor = axios.create({
    baseURL: 'https://blueprintfactorybackend.online/api', // Replace with your API base URL
});

axiosInterceptor.interceptors.request.use(

    async (config) => {
        console.log("Intercepted!")
        const data = await getServerSession(authOptions);

        console.log(JSON.stringify(data))

        // if (accessToken) {
        //     if (config.headers) config.headers.token = accessToken;
        // }
        return config;
    },
    (error) => {
        // Handle request errors here

        return Promise.reject(error);
    }
);

// Response interceptor
axiosInterceptor.interceptors.response.use(
    (response) => {
        // Modify the response data here

        return response;
    },
    (error) => {
        // Handle response errors here

        return Promise.reject(error);
    }
);

export default axiosInterceptor;
