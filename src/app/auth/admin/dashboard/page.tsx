import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";


export default async function Dashboard() {

    return (
        <main>
            DASHBOARD
        </main>
    )
}