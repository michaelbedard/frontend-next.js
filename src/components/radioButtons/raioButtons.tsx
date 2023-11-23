'use client';

import styles from "./radioButtons.module.css"

interface RadioButtonsProps {
    options: { label: string; value: string }[];
    selectedOption: string;
    onSelect: (value: string) => void;
}

// it creates some error!

const RadioButtons = ({options, selectedOption, onSelect}: RadioButtonsProps) => {
    return (
        <>
            {/*{options.map((option) => (*/}
            {/*    <label key={option.value}>*/}
            {/*        <input*/}
            {/*            className={styles.input}*/}
            {/*            type="radio"*/}
            {/*            name="radioGroup"*/}
            {/*            value={option.value}*/}
            {/*            checked={selectedOption === option.value}*/}
            {/*            onChange={() => onSelect(option.value)}*/}
            {/*        />*/}
            {/*        {option.label}*/}
            {/*    </label>*/}
            {/*))}*/}
        </>
    );
}

export default RadioButtons