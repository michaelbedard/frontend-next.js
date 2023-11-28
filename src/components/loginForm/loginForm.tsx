'use client';

import {Button} from "@/components/button/button";
import {useState} from "react";
import {signIn} from "next-auth/react";
import Styles from "./loginForm.module.css"


export default function LoginForm() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleCreateAccount() {

        //create  the account, then signIn

        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            // callbackUrl: "/blog"
        })

        console.log(result)
    }

    async function handleSignIn() {
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            // callbackUrl: "/blog"
        })

        console.log(result)
    }

    function handleForgetPassword() {
        window.alert("This function is not yet available.  Please create a new account")
    }

    return (
        <div className={Styles.container}>

            <div className={`${Styles.signUpContainer} ${isSignIn ? "" : Styles.active}`}>
                <div className={Styles.form}>
                        <h1>Create Account</h1>
                        <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        <div className={"login-card__btn-holder"}>
                            <Button label={"Sign Up"} onClick={handleCreateAccount} />
                            <div className={"login-card__switch-btn"}>
                                <div style={{marginBottom: "5px", marginTop: "5px"}}>or</div>
                                <Button label={"Sign In"} onClick={() => {setIsSignIn(true)}} style={{color: "black"}}/>
                            </div>
                        </div>
                </div>
            </div>
            <div className={`${Styles.signInContainer} ${isSignIn ? "" : Styles.active}`}>
                <div className={Styles.form}>
                        <h1>Sign in</h1>
                        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        <a href={"#"} onClick={handleForgetPassword}>Forgot your password?</a>
                        <div className={"login-card__btn-holder"}>
                            <Button label={"Sign In"} onClick={handleSignIn} />
                            <div className={"login-card__switch-btn"}>
                                <div style={{marginBottom: "5px", marginTop: "5px"}}>or</div>
                                <Button label={"Sign Up"} onClick={() => {
                                    setIsSignIn(false)
                                }} style={{color: "black"}} />
                            </div>
                        </div>
                </div>
            </div>

            <div className={`${Styles.overlay} ${isSignIn ? "" : Styles.active}`}>
                <div className={`${Styles.overlayContent} ${isSignIn ? "" : Styles.active}`}>
                    <div className={`${Styles.overlayPanel} ${Styles.left} ${isSignIn ? "" : Styles.active}`}>
                        <h1>Welcome Back!</h1>
                        <p style={{padding: "20px"}}>
                            To keep connected with us please login with your personal info
                        </p>
                        <Button
                            label={"Sign In"}
                            onClick={() => {
                                setIsSignIn(true)
                            }}
                            style={{color: "black"}}
                        />
                    </div>

                    <div className={`${Styles.overlayPanel} ${Styles.right} ${isSignIn ? "" : Styles.active}`}>
                        <h1>Hello, Friend!</h1>
                        <p style={{padding: "20px"}}>
                            Enter Your personal details and start journey with us
                        </p>
                        <Button
                            label={"Sign Up"}
                            onClick={() => {
                                setIsSignIn(false)
                            }}
                            style={{color: "black"}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}