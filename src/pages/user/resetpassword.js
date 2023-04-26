import { useState } from "react"
import Aside from "@/components/Aside"
import Image from "next/image"
import axios from "axios"

import mail from "../../assets/icons/mail.svg"
import mailFilled from "../../assets/icons/mail-filled.svg"
import Loader from "@/components/Loader"
import Toast from "@/components/Toast"

const ResetPasword = () => {
    const [email, setEmail] = useState(null)
    //loader
    const [isLoading, setIsLoading] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const inputHandler = (e) => {
        setEmail(e.target.value)
    }

    const sendReset = async () => {
        try {
            setIsLoading(true)
            const linkDirect = `https://fazzpay-chi.vercel.app/user/newpassword`
            const body = {
                email,
                linkDirect
            }
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/auth/forgot-password`
            const result = await axios.post(url, body)
            setShowToast(true)
            setToastMsg(result.data.msg)
            setToastType('success')
        } catch (error) {
            setShowToast(true)
            setToastMsg(error.response.data.msg)
            setToastType('danger')
        } finally {
            setIsLoading(false)
        }
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
                        <button type="button" className={`${email ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} onClick={sendReset}>Confirm</button>
                        <div className={`${email ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Confirm</div>
                    </div>
                </section>
                {isLoading && <Loader />}
            </main>
            <Toast msg={toastMsg} isShow={showToast} toastType={toastType} showHandler={() => setShowToast(false)} />
        </section>
    )
}

export default ResetPasword