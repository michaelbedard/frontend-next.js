'use client';

import Styles from "./footer.module.css"

export default function Footer() {

    return (
        <footer className={Styles.footer}>
            <img
                src="/assets/logo.png"  // Adjust the path based on your project structure
                alt="Dollar Bill Icon"
                className={Styles.logoContainer}
            />
            <div className={Styles.linkContainer}>
                <div className={Styles.linkList}>
                    <a href={"/home"} >Home</a>
                    <a href={"/blog"} >All Blog</a>
                    <a href={"/about-us"} >About Me</a>
                </div>
                <div className={Styles.linkList} style={{flexWrap: "wrap"}}>
                    <a href={"/terms-and-conditions"} >Terms & Conditions</a>
                    <a href={"/references"} >References</a>
                </div>
            </div>
        </footer>
    )
}