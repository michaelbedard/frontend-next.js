'use client';

import {ChangeEvent, useEffect, useState} from "react";
import {blogType} from "blog-types";
import {useRouter} from "next/navigation";
import {deleteBlog, updateBlog} from "@/service/BlogService";
import {useSession} from "next-auth/react";
import {Button} from "@/components/button/button";
import TextEditor from "@/components/Editors/textEditor/textEditor";
import FaqEditor from "@/components/Editors/faqEditor/faqEditor";
import ResourceEditor from "@/components/Editors/resourceEditor/resourceEditor";
import Styles from "./blogEditorCSR.module.css"

interface BlogEditorProps {
    data : blogType
    tags: tagType[]
}

export default function BlogEditorCSR({ data, tags } : BlogEditorProps) {
    const [file, setFile] = useState<File | null>(null)
    const [blogData, setBlogData] = useState<blogType>(data)
    const { data : session } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (file != null) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
                reader.onload = () => {
                    const base64ImageSource = reader.result as string
                    setBlogData({...blogData, imageSource: base64ImageSource}) //base64 string
                }
                reader.onerror = () => {
                    console.log("error in file reading")
                }
        }


    }, [file]);

    function handleImageSource(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files !== null) {
            setFile(e.target.files[0]);
        }
    }

    function setBlogText(content: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const elements = doc.body.children; // Select all children of the body

        if (elements.length >= 2 && elements[0].tagName.toLowerCase() === 'p' && elements[elements.length - 1].tagName.toLowerCase() === 'p') {
            const introduction = elements[0].outerHTML;
            const conclusion = elements[elements.length - 1].outerHTML;
            const updatedContent = Array.from(elements).slice(1, -1).map(el => el.outerHTML).join('');

            setBlogData(prevBlogData => ({
                ...prevBlogData,
                introduction,
                conclusion,
                body: updatedContent
            }));
        }
    }

    function handleToggleTag(tag: tagType, active: boolean) {
        let updatedTags = [...blogData.tags];

        if (active) {
            for (let i = 0; i < blogData.tags.length; i++) {
                if (blogData.tags[i].id === tag.id) {
                    updatedTags.splice(i, 1);
                    break;
                }
            }
            setBlogData({...blogData, tags: updatedTags})
        } else {
            updatedTags = [...updatedTags, tag]
            setBlogData({...blogData, tags: updatedTags})
        }
    }

    function handleSubmit(showSuccess: boolean) {
        if (session?.user) {
            updateBlog(session.user.jwtToken, blogData)
                .then((data) => {
                    if (showSuccess) {
                        window.alert("Success")
                    }
                    console.log("Saved")
                })
                .catch((err) => {
                    console.log(err)
                    window.alert("Failed")
                })
        }
    }

    function handleDelete() {
        const { data : session } = useSession();
        if (session?.user && window.confirm("Are you sure you want to remove blog?")) {
            deleteBlog(session.user.jwtToken, parseInt(blogData.id))
                .then(() => {
                    router.push("/")
                })
        }
    }

    const blogText: string = blogData.introduction + blogData.body + blogData.conclusion

    return (
        <>
            <section className={Styles.btnContainer}>
                <Button label={"Public"} onClick={() => setBlogData({...blogData, status: "PUBLIC"})} isActive={blogData.status === "PUBLIC"}/>
                <Button label={"Private"} onClick={() => setBlogData({...blogData, status: "PRIVATE"})} isActive={blogData.status === "PRIVATE"}/>
            </section>
            <section>
                {blogData.status}
            </section>
            <section>
                <div className={Styles.inputContainer} style={{marginBottom: "20px"}}>
                    <label htmlFor={"title"}>title: </label>
                    <input
                        id={"title"}
                        type={"text"}
                        placeholder={"ex: [2023] How To Write The Best Blog Post - Quick And Easy"}
                        onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                        value={blogData.title}
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <label htmlFor={"subtitle"}>subtitle: </label>
                    <input
                        id={"subtitle"}
                        type={"text"}
                        placeholder={"ex: A practical guide for new and advance bloggers"}
                        onChange={(e) => setBlogData({...blogData, subtitle: e.target.value})}
                        value={blogData.subtitle}
                    />
                </div>
            </section>
            <section >
                <input type={"file"} accept={"image/*"} onChange={handleImageSource}/>
                {blogData.imageSource !== "" && (
                    <img className={Styles.imageContainer} src={blogData.imageSource}  alt={"cover"}/>
                )}
            </section>
            <section>
                <div className={Styles.tagsContainer}>
                    {tags.map((tag, index) => {
                        let active = false;
                        for (let i = 0; i < blogData.tags.length; i++) {
                            const iterativeTag: tagType = blogData.tags[i]
                            if (iterativeTag.id === tag.id) {
                                active = true;
                                break
                            }
                        }

                        return (
                            <Button
                                key={index}
                                label={tag.name}
                                onClick={() => handleToggleTag(tag, active)}
                                isActive={active}
                            />
                        )
                    })}
                </div>
            </section>
            <section>
                <TextEditor
                    initialContent={blogData.body === "" ? "<p>Body</p>" : blogText}
                    onChange={(content) => setBlogText(content)}
                    onSave={() => handleSubmit(false)}
                />
            </section>
            <section>
                <FaqEditor data={blogData} setData={setBlogData} />
            </section>
            <section>
                <ResourceEditor data={blogData} setData={setBlogData} />
            </section>
            <section className={Styles.btnContainer}>
                <Button label={"Update"} onClick={() => handleSubmit(true)} />
                <Button label={"See Blog"} onClick={() => router.push(`/blog/${blogData.path}`)} />
                <Button label={"Delete"} onClick={() => handleDelete()} />
            </section>
        </>
    );

}