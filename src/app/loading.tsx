import {ReactNode} from "react";
import Styles from "./helper.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


interface LoadingProps {
    size?: "SMALL" | "MEDIUM" | "LARGE" | "AUTO"
    message?: string
}

export default function Loading({size, message} : LoadingProps) {
    let boxHeight = "80vh"

    if (size === "SMALL") {
        boxHeight = "80px"
    } else if (size === "MEDIUM") {
        boxHeight = "160px"
    } else if (size === "LARGE") {
        boxHeight = "320px"
    } else if (size === "AUTO") {
        boxHeight = "100%"
    }

    // i.e if it is loaded by the server at first
    if (size == undefined && message == undefined) {
        return (
            <main>
                <section className={Styles.container} style={{height: "64vh"}}>
                    <FontAwesomeIcon icon={faSpinner} className={`fa-xl fa-spin`}/>
                </section>
                <section className={Styles.container} style={{height: "100vh"}}>
                    <FontAwesomeIcon icon={faSpinner} className={`fa-xl fa-spin`}/>
                </section>
            </main>
        )
    } else {
        return (
            <div className={Styles.container} style={{height: boxHeight}}>
                <FontAwesomeIcon icon={faSpinner} className={`fa-xl fa-spin`}/>
                {message &&
                    <p>{message}</p>
                }
            </div>
        )
    }
}