import React, {ChangeEvent} from "react";
import {Button} from "@/components/button/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Styles from "./faqEditor.module.css"

type FaqProps = {
    data: any;
    setData: (data: any) => void
}

const FaqEditor = ({data, setData}: FaqProps) => {

    function handleChangeFaqQuestionText(e : ChangeEvent<HTMLInputElement>, index: number) {
        const updatedFaqs = [...data.faqs];
        updatedFaqs[index].questionText = e.target.value;
        setData({...data, faqs: updatedFaqs})
    }

    function handleChangeFaqAnswerText(e : ChangeEvent<HTMLTextAreaElement>, index: number) {
        const updatedFaqs = [...data.faqs];
        updatedFaqs[index].answerText = e.target.value;
        setData({...data, faqs: updatedFaqs})
    }

    function handleDeleteFaq(index: number) {
        const updatedFaqs = [...data.faqs];
        updatedFaqs.splice(index, 1);
        setData({...data, faqs: updatedFaqs})
    }

    function handleAddFaq() {
        const updatedFaqs = [...data.faqs, { questionText: "", answerText: "" }]
        setData({...data, faqs: updatedFaqs});
    }

    return (
        <div className={Styles.container}>
            {data.faqs.map((faq: any, index: number) => {
                return (
                    <div key={index}>
                        <div className={Styles.infoContainer}>
                            <label htmlFor={`faqQuestion_${index}`}>Question {index + 1}: </label>
                            <span onClick={() => handleDeleteFaq(index)}>
                                <FontAwesomeIcon icon={faTimes} className="fa-xmark" />
                            </span>
                        </div>
                        <input
                            id={`faqQuestion_${index}`}
                            onChange={(e) => handleChangeFaqQuestionText(e, index)}
                            placeholder={"question text"}
                            value={faq.questionText}
                        />
                        <textarea
                            id={`faqAnswer_${index}`}
                            onChange={(e) => handleChangeFaqAnswerText(e, index)}
                            placeholder={"answer text"}
                            value={faq.answerText}
                        />
                    </div>
                )
            })}
            <Button label={"Add Question"} onClick={handleAddFaq} />
        </div>
    )
}

export default FaqEditor