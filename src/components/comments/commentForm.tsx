import React, {ChangeEvent, useEffect, useState} from "react";
import {Button} from "@/components/button/button";
import Styles from "./comments.module.css"

type CommentFormProps={
    submitLabel: string,
    hasCancelButton: boolean
    handleSubmit: (body: string, parentId: string | null) => void
    handleCancel?: () => void
}

const CommentForm = ({submitLabel, hasCancelButton, handleSubmit, handleCancel}: CommentFormProps) => {
    const [text, setText] = useState<string>("")
    const isTextareaDisable = text.length === 0

    function onSubmit() {
        if (isTextareaDisable) {
            console.log("Enter message first")
        } else {
            handleSubmit(text, null)
        }
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value)
        if (text !== "") {
            console.log("Enter message first")
        }
    }

    return (
        <form>
            <textarea
                className={Styles.commentFormTextarea}
                value={text}
                onChange={(e) => handleChange(e)}
            />
            <div className={Styles.commentFormBtnContainer}>
                <div style={{marginRight: "5px"}}>
                    <Button label={submitLabel} onClick={onSubmit} isActive={isTextareaDisable}/>
                </div>
                {(hasCancelButton && handleCancel) && (
                    <Button label={"Cancel"} onClick={handleCancel}/>
                )}
            </div>
        </form>
    )
}

export default CommentForm
