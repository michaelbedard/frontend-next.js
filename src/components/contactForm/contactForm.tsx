'use client'

import {ChangeEvent, useRef, useState} from "react";
import {useSession} from "next-auth/react";
import emailjs from '@emailjs/browser';
import Loading from "@/app/loading";
import {Button} from "@/components/button/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';
import Styles from "./contactForm.module.css"

const ContactForm = () => {
    const { data } = useSession()
    const [name, setName] = useState<string>(data?.user ? data.user.name : "")
    const [email, setEmail] = useState<string>(data?.user ? data.user.email: "")
    const [message, setMessage] = useState<string>("")
    const [submitState, setSubmitState] = useState<"valid" | "loading" | "error" | "finished">("valid");
    const form = useRef<HTMLFormElement | null>(null);

    function handleSubmit() {
        try {
            if (form !== null && form.current !== null && name != "" && email != "" && message != "") {
                setSubmitState("loading")
                emailjs.sendForm('service_bdlg4zj', 'template_f7pr9fz', form.current, 'B_JvpXHj8Wr1_J_Yl')
                    .then((result) => {
                        console.log(result.text);
                        setSubmitState("finished")
                    }, (error) => {
                        console.log(error.text);
                        setSubmitState("error")
                    });
            }
        } catch (e) {
            console.log(e)
        }
    }

    function handleMessage(e: ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value)
    }




        return (
            <div className={Styles.container}>
                {submitState == "finished" && (
                    <div className={Styles.alternative}>
                        <FontAwesomeIcon icon={faLaughBeam} size="2x" className="fa-xl" />
                        <p>An email has been sent.  Thanks for writing us!</p>
                    </div>
                )}
                {submitState == "loading" && (
                    <Loading size={"AUTO"} />
                )}
                {submitState == "error" && (
                    <div>
                        ERROR
                    </div>
                )}
                {submitState == "valid" && (
                    <form ref={form}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            name="user_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Message</label>
                        <textarea name="message" value={message} onChange={(e) => handleMessage(e)}/>
                            <div className={Styles.button}>
                                <Button
                                    label={"Send"}
                                    onClick={handleSubmit}
                                    style={{width: "min(450px, 100%)"}}
                                    image={<img alt={"send email"} src={"../../../assets/pencil.png"}/>}
                                />
                            </div>
                    </form>
                )}
            </div>
        );
}

export default ContactForm