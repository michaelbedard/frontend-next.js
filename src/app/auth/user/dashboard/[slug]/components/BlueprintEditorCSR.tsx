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
import Styles from "../../../../admin/dashboard/blog-manager/[path]/components/blogEditorCSR.module.css"
import {blueprintType} from "blueprint-types";
import {deleteBlueprint, updateBlueprint} from "@/service/BlueprintService";

interface BlueprintEditorProps {
    data : blueprintType
    tags: tagType[]
}

export default function BlueprintEditorCSR({ data, tags } : BlueprintEditorProps) {
    const [file, setFile] = useState<File | null>(null)
    const [blueprintData, setBlueprintData] = useState<blueprintType>(data)
    const { data : session } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (file != null) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64ImageSource = reader.result as string
                setBlueprintData({...blueprintData, imageSource: base64ImageSource}) //base64 string
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

    function setBlueprintText(content: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const elements = doc.body.children; // Select all children of the body

        if (elements.length >= 2 && elements[0].tagName.toLowerCase() === 'p' && elements[elements.length - 1].tagName.toLowerCase() === 'p') {
            const introduction = elements[0].outerHTML;
            const conclusion = elements[elements.length - 1].outerHTML;
            const updatedContent = Array.from(elements).slice(1, -1).map(el => el.outerHTML).join('');

            setBlueprintData(prevBlueprintData => ({
                ...prevBlueprintData,
                introduction,
                conclusion,
                body: updatedContent
            }));
        }
    }

    function handleToggleTag(tag: tagType, active: boolean) {
        let updatedTags = [...blueprintData.tags];

        if (active) {
            for (let i = 0; i < blueprintData.tags.length; i++) {
                if (blueprintData.tags[i].id === tag.id) {
                    updatedTags.splice(i, 1);
                    break;
                }
            }
            setBlueprintData({...blueprintData, tags: updatedTags})
        } else {
            updatedTags = [...updatedTags, tag]
            setBlueprintData({...blueprintData, tags: updatedTags})
        }
    }

    function handleSubmit(showSuccess: boolean) {
        if (session?.user) {
            updateBlueprint(session.user.jwtToken, blueprintData)
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
        if (session?.user && window.confirm("Are you sure you want to remove blog?")) {
            deleteBlueprint(session.user.jwtToken, parseInt(blueprintData.id))
                .then(() => {
                    router.push("/auth/user/dashboard")
                })
        }
    }

    const blueprintText: string = blueprintData.introduction + blueprintData.body + blueprintData.conclusion

    return (
        <>
            <section className={Styles.btnContainer}>
                <Button label={"Public"} onClick={() => setBlueprintData({...blueprintData, status: "PUBLIC"})} isActive={blueprintData.status === "PUBLIC"}/>
                <Button label={"Private"} onClick={() => setBlueprintData({...blueprintData, status: "PRIVATE"})} isActive={blueprintData.status === "PRIVATE"}/>
            </section>
            <section>
                <div className={Styles.inputContainer} style={{marginBottom: "20px"}}>
                    <label htmlFor={"title"}>title: </label>
                    <input
                        id={"title"}
                        type={"text"}
                        placeholder={"ex: [2023] How To Write The Best Blog Post - Quick And Easy"}
                        onChange={(e) => setBlueprintData({...blueprintData, title: e.target.value})}
                        value={blueprintData.title}
                    />
                </div>
                <div className={Styles.inputContainer}>
                    <label htmlFor={"subtitle"}>subtitle: </label>
                    <input
                        id={"subtitle"}
                        type={"text"}
                        placeholder={"ex: A practical guide for new and advance bloggers"}
                        onChange={(e) => setBlueprintData({...blueprintData, subtitle: e.target.value})}
                        value={blueprintData.subtitle}
                    />
                </div>
            </section>
            <section >
                <input type={"file"} accept={"image/*"} onChange={handleImageSource}/>
                {blueprintData.imageSource !== "" && (
                    <img className={Styles.imageContainer} src={blueprintData.imageSource}  alt={"cover"}/>
                )}
            </section>
            <section>
                <div className={Styles.tagsContainer}>
                    {tags.map((tag, index) => {
                        let active = false;
                        for (let i = 0; i < blueprintData.tags.length; i++) {
                            const iterativeTag: tagType = blueprintData.tags[i]
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
                    initialContent={blueprintData.body === "" ? "<p>Body</p>" : blueprintText}
                    onChange={(content) => setBlueprintText(content)}
                    onSave={() => handleSubmit(false)}
                />
            </section>

            <section>
                <ResourceEditor data={blueprintData} setData={setBlueprintData} />
            </section>
            <section className={Styles.btnContainer}>
                <Button label={"Update"} onClick={() => handleSubmit(true)} />
                <Button label={"See Blog"} onClick={() => router.push(`/blueprint/${blueprintData.id}`)} />
                <Button label={"Delete"} onClick={() => handleDelete()} />
            </section>
        </>
    );

}