'use client';

import Styles from "./cookieBanner.module.css"
import {useEffect, useState} from "react";
import {getLocalStorage, setLocalStorage} from "@/utils/storageHelper";
import {Button} from "@/components/button/button";

export default function CookieBanner(){
    const [cookieConsent, setCookieConsent] = useState<true | false | null>(false);

    useEffect(() => {
        // Check if running in the browser before performing any client-side logic
        if (typeof window !== 'undefined') {
            const storedCookieConsent = getLocalStorage("cookie_consent", null);
            setCookieConsent(storedCookieConsent);

            console.log("COOKIE CLIENT")
        } else {
            console.log("COOKIE SERVER")
        }
    }, []);

    const handleCookieConsent = (consent: boolean) => {
        console.log(`CONSENT : ${consent}`)

        setCookieConsent(consent);
        setLocalStorage("cookie_consent", consent);

        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            const newValue = consent ? 'granted' : 'denied';
            window.gtag("consent", 'update', {
                'analytics_storage': newValue
            });
            console.log("Cookie Consent: ", consent);
        }
    };

    return (
        <section className={cookieConsent == null ? Styles.container : Styles.hidden}>
            <div className={Styles.link}>
                <p>We use <span>cookies</span> on our site to enhance your experience.</p>
            </div>
            <div className={Styles.buttons}>
                <Button label={"Decline"} onClick={() => handleCookieConsent(false)} />
                <Button label={"Allow Cookies"} onClick={() => handleCookieConsent(true)}/>
            </div>
        </section>
    )}