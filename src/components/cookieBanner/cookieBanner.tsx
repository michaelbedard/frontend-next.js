'use client';

import Link from 'next/link'
import Styles from "./cookieBanner.module.css"
import {useEffect, useState} from "react";
import {getLocalStorage, setLocalStorage} from "@/utils/storageHelper";

export default function CookieBanner(){
    const [cookieConsent, setCookieConsent] = useState<true | false | null>(null);

    useEffect (() => {
        const storedCookieConsent = getLocalStorage("cookie_consent_blueprintfactory", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent_blueprintfactory", cookieConsent)

        console.log("Cookie Consent: ", cookieConsent)
    }, [cookieConsent]);

    return (
        <div className={cookieConsent != null ? Styles.hidden : Styles.container}>
            <div>
                <Link href="/info/cookies"><p>We use <span>cookies</span> on our site.</p></Link>
            </div>
            <div>
                <button onClick={() => setCookieConsent(false)}>Decline</button>
                <button onClick={() => setCookieConsent(true)}>Allow Cookies</button>
            </div>
        </div>
    )}