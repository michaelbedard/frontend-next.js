import {Button} from "@/components/button/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Styles from "./collapsibleMenu.module.css"


interface AccordionSectionProps {
    section: {questionText: string, answerText: string}
    isActiveSection: boolean
    setActiveIndex: (index: number | null) => void
    activeIndex: number | null
    sectionIndex: number
}

const AccordionSection = ({section, isActiveSection, sectionIndex, setActiveIndex, activeIndex}: AccordionSectionProps ) => {
    function toggleSection() {
        const nextIndex = isActiveSection ? null : sectionIndex
        setActiveIndex(nextIndex)
    }

    return (
        <div>
            <Button label={section.questionText}
                    onClick={toggleSection}
                    image={isActiveSection
                        ? <FontAwesomeIcon icon={faMinus} className={Styles.rotateMinus} />
                        : <FontAwesomeIcon icon={faPlus} className={Styles.rotatePlus} />
            }/>
            {isActiveSection ? (
                <p className={Styles.content}>
                    {section.answerText}
                </p>
            ) : (
                <div style={{height: "8px"}}></div>
            )}
        </div>
    )
}

export default AccordionSection