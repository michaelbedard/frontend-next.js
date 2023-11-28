import {redirect} from "next/navigation";


export default function Page() {

    redirect("/home")

    return (
        <div>
            REDIRECT TO HOME PAGE
        </div>
    )
}