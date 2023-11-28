'use client';

import React, {useEffect, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "@/components/button/button";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import styles from "./header.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter();
    const { data : session} = useSession()

    // Set showMenu to false on page scroll
    useEffect(() => {
        setShowMenu(false);
    }, [pathname]);

    // Set showMenu to false on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowMenu(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
            <header className={styles.container}>
                <div className={styles.background}/>

                <img
                    className={styles.logo}
                    onClick={() => router.push("/home")}
                    alt={"logo"}
                    src={"../../assets/blog_banner.png"}
                />

                <nav>
                    <ul className={showMenu ? styles.active : ""}>
                        <Link href={"/home"} >Home</Link>
                        <Link href={"/blog"} >All Blog</Link>
                        <Link href={"/about-us"} >About Me</Link>
                        {(session?.user && session.user.role === "ADMIN") &&
                            <Link href={"/auth/admin/dashboard"} >Dashboard</Link>
                        }
                        <div className={styles.loginButton__sideBar}>
                            <Button
                                label={session?.user ? "Log Out" : "Log In"}
                                onClick={session?.user ? () => signOut() : () => signIn()}
                                isActive={false}
                                image={<img src={"../../assets/user.png"} />}
                            />
                        </div>
                    </ul>
                </nav>
                <div className={styles.loginButton}>
                    <Button
                        label={session?.user ? "Log Out" : "Log In"}
                        onClick={session?.user ? () => signOut() : () => signIn()}
                        isActive={false}
                        image={<img src={"../../assets/user.png"} /> }
                    />
                </div>
                <div className={styles.hamburgerMenu}>
                    <FontAwesomeIcon
                        icon={showMenu ? faXmark : faBars}
                        size="lg"
                        onClick={() => setShowMenu((prev) => !prev)}
                    />
                </div>
            </header>
    )
}