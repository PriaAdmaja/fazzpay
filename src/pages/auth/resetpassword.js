import { useState } from "react"
import Aside from "@/components/Aside"
import Image from "next/image"

import mail from "../../assets/icons/mail.svg"
import mailFilled from "../../assets/icons/mail-filled.svg"

const ResetPasword = () => {
    const [email, setEmail] = useState(null)

    const inputHandler = (e) => {
        setEmail(e.target.value)

    }

    return (
        <section className="flex justify-center items-center">
            <Aside />
            <main className="flex-1 relative bg-primary md:bg-white ">
                <section className="py-[5%] px-[10%] m-[5%] md:m-0 bg-white rounded-xl ">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold pb-5 md:pb-6 lg:pb-8 text-dark">Did You Forgot Your Password?
                        Don’t Worry, You Can Reset Your
                        Password In a Minutes.</h1>
                    <p className="text-dark text-sm md:text-base opacity-60 pb-10  lg:pb-16">To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
                    <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!email ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={mail} alt="mail" className={`w-5 h-auto ${email ? 'hidden' : 'block'}`} />
                            <Image src={mailFilled} alt="mail" className={`w-5 h-auto ${email ? 'block' : 'hidden'}`} />
                            <input type="text" className="w-full outline-none text-sm md:text-base" name="email" placeholder="Enter your e-mail" onChange={(e) => inputHandler(e)} />
                        </div>
                    </div>
                    <div className="pt-[90px]">
                        <button type="button" className={`${email ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} >Confirm</button>
                        <div className={`${email ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Confirm</div>
                    </div>
                </section>
            </main>
        </section>
    )
}

export default ResetPasword