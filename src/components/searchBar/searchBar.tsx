'use client';

import {useEffect, useState} from "react";
import Styles from "./searchBar.module.css"

interface SearchBarProps {
    onChange: (inputText: string) => void
}

const SearchBar = ({onChange}: SearchBarProps) => {
    const [inputText, setInputText] = useState("")
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        onChange(inputText)
    }, [onChange, inputText])

    return (
        <div className={`${Styles.container} ${focused? Styles.active : ""}`}>
            <div className={Styles.icons}>
                <i className="fas fa-search"></i>
            </div>
            <input
                value={inputText}
                type={"text"}
                placeholder={"search..."}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <div className={Styles.icons}>
                <i className="fas fa-times" onClick={() => setInputText("")}></i>
            </div>
        </div>
    );
}

export default SearchBar