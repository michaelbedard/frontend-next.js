'use client';

import React from "react";
import {Button} from "@/components/button/button";
import Styles from "./resourceEditor.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ResourceProps {
    data: any;
    setData: (data: any) => void
}

const ResourceEditor = ({data, setData}: ResourceProps) => {
    function handleChangeResourceText(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const updatedResource = [...data.resources]
        updatedResource[index].text = e.target.value;
        setData({...data, resources: updatedResource})
    }

    function handleChangeResourceLink(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const updatedResource = [...data.resources]
        updatedResource[index].link = e.target.value;
        setData({...data, resources: updatedResource})
    }

    function handleDeleteResource(index: number) {
        const updatedResource = [...data.resources]
        updatedResource.splice(index, 1);
        setData({...data, resources: updatedResource})
    }

    function handleAddResource() {
        const updatedResource = [...data.resources, {text: "", link: ""}]
        setData({...data, resources: updatedResource})
    }

    return (
        <div className={Styles.container}>
            {data.resources.map((resource: any, index: number) => {
                return (
                    <div key={index}>
                        <div className={Styles.infoContainer}>
                            <label htmlFor={`resource_${index}`}>Resource {index + 1}: </label>
                            <span onClick={() => handleDeleteResource(index)}>
                                 <FontAwesomeIcon icon={faTimes} className="fa-xmark" />
                            </span>
                        </div>
                        <input
                            id={`resource_${index}`}
                            onChange={(e) => handleChangeResourceText(e, index)}
                            placeholder={"text"}
                            value={resource.text}
                        />
                        <input
                            id={`resource_${index}`}
                            onChange={(e) => handleChangeResourceLink(e, index)}
                            placeholder={"link"}
                            value={resource.link}
                        />
                    </div>
                )
            })}
            <Button label={"Add Resource"} onClick={handleAddResource} />
        </div>
    )
}

export default ResourceEditor