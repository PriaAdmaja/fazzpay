import Image from "next/image"
import error404 from "../assets/background/404.webp"
import { useRouter } from "next/router"
import Head from "next/head"

const Custom404 = () => {
    const router = useRouter()
    return (
        <main className="flex justify-center items-center h-screen flex-col">
            <Head>
                <title>FazzPay</title>
            </Head>
            <Image src={error404} alt="error" className="h-4/5 w-auto" />
            <button type="button" className="py-2 px-3 rounded-xl bg-primary text-white cursor-pointer " onClick={() => router.replace('/')}>Back to Home</button>
        </main>
    )
}

export default Custom404