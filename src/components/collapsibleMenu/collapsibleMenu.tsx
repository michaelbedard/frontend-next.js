'use client';

import AccordionSection from "@/components/collapsibleMenu/accordionSection";
import {useState} from "react";
import Styles from "./collapsibleMenu.module.css"


type CollapsibleMenuProps = {
    items: {questionText: string, answerText: string}[]
}

const CollapsibleMenu = ({items} : CollapsibleMenuProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    return (
        <div className={Styles.collapsibleMenu}>
            {items.map((section, index) => {
                const isActiveSection = index === activeIndex

                return (
                    <AccordionSection
                        key={index}
                        section={section}
                        isActiveSection={isActiveSection}
                        sectionIndex={index}
                        setActiveIndex={setActiveIndex}
                        activeIndex={activeIndex}
                    />
                )
            })}
        </div>
    )
}

export default CollapsibleMenu;