'use client';

import {Button} from "@/components/button/button";
import { useRouter } from "next/navigation";
import {createBlog} from "@/service/BlogService";
import {useSession} from "next-auth/react";
import {useState} from "react";

export default function CreateBlogBtnCSR() {
    const [blogPath, setBlogPath] = useState('');
    const {data: session} = useSession()
    const router = useRouter();

    const handleClick = async () => {
        if (session?.user) {
            const userPath = prompt('Enter the path for the new blog:');

            if (userPath) {
                setBlogPath(userPath);
                try {
                    await createBlog(session.user.jwtToken, userPath);
                    router.push(`/auth/admin/dashboard/blog-manager/${userPath}`);
                } catch (error) {
                    console.error('Error creating blog:', error);
                }
            } else {
                alert('Please enter a valid path.');
            }
        }
    };

    return (
        <Button
            label={"Create Blog"}
            style={{width: "min(100%, 700px)"}}
            onClick={handleClick}
        />
    )
}