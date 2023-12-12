'use client';

import {useState} from "react";
import {Editor} from "@tinymce/tinymce-react";

interface TextEditorProps {
    initialContent: string
    onChange: (content: string) => void
    onSave: () => void
}

const TextEditor = ({initialContent, onChange, onSave} : TextEditorProps) => {
    const [text, setText] = useState("")
    const [value, setValue] = useState(initialContent);

    function handleEditorChange(newValue: string, editor: any) {
        setValue(newValue)
        onChange(newValue)

        setText(editor.getContent({format: "text"}))
    }

    return (
        <div style={{width: "100%"}}>
            <Editor
                apiKey={"pf6uyj4hif9abjqg43l98uwwv6nycmu2d7bj3yxnpm1oxd3s"}
                onEditorChange={(newValue, editor) => handleEditorChange(newValue, editor)}
                value={value}
                init={{
                    plugins : "advlist anchor lists autolink autoresize autosave charmap code bullist numlist codesample directionality emoticons fullscreen help image importcss insertdatetime link linkchecker lists media nonbreaking pagebreak preview quickbars save searchreplace table tinydrive visualblocks visualchars wordcount",
                    toolbar: 'undo redo | formatselect | bold italic underline | bullist numlist lists alignleft aligncenter alignright alignjustify outdent indent',
                    content_style: "body { font-family: Inter, latin; font-size: 20px; line-height: 1.5 }",
                    toolbar_sticky: true,
                    save_onsavecallback: () => {
                        onSave()
                    }
                }}
            />
        </div>
    )

}

export default TextEditor;