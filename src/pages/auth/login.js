import Aside from "@/components/Aside"
import Image from "next/image"

import mail from "../../assets/icons/mail.svg"
import lock from "../../assets/icons/lock.svg"

const Login = () => {
    return (
        <section className="flex justify-center items-center">
            <Aside />
            <main className="flex-1 py-[5%] px-[10%]">
                <h1 className="text-2xl font-bold pb-8 text-dark">Start Accessing Banking Needs
                    With All Devices and All Platforms
                    With 30.000+ Users</h1>
                <p className="text-dark opacity-60 pb-16">Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                <div className="flex flex-col gap-16">
                    <div className="flex justify-start items-center gap-3 border-b-[1.5px] border-solid border-b-accent pb-4">
                        <Image src={mail} alt="mail" className="w-5 h-auto" />
                        <input type="text" className="w-full outline-none" placeholder="Enter your e-mail" />
                    </div>
                    <div className="flex justify-start items-center gap-3 border-b-[1.5px] border-solid border-b-accent pb-4">
                        <Image src={lock} alt="mail" className="w-5 h-auto" />
                        <input type="text" className="w-full outline-none" placeholder="Enter your password" />
                    </div>
                </div>
                <button type="button" className="text-right pt-5 text-[#3a3d42] opacity-80">Forgot Password?</button>
            </main>
        </section>
    )
}

export default Login