import { useState } from "react"
import Aside from "@/components/Aside"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"

import mail from "../../assets/icons/mail.svg"
import mailFilled from "../../assets/icons/mail-filled.svg"
import mailError from "../../assets/icons/mail-error.svg"
import lock from "../../assets/icons/lock.svg"
import lockFilled from "../../assets/icons/lock-filled.svg"
import lockError from "../../assets/icons/lock-error.svg"
import eye from "../../assets/icons/eye.svg"
import eyeCrossed from "../../assets/icons/eye-crossed.svg"
import Loader from "@/components/Loader"
import Toast from "@/components/Toast"
import { userDataAction } from "@/redux/slice/userData"

const Login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [seePwd, setSeePwd] = useState(false)
    //loader
    const [isLoading, setIsLoading] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const inputHandler = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            return
        }
        setPassword(e.target.value)
    }

    const showPassword = () => {
        seePwd === true ? setSeePwd(false) : setSeePwd(true)
    }

    const generateLogin = async () => {
        try {
            setIsLoading(true)
            const body = {
                email,
                password
            }
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/auth/login`
            const result = await axios.post(url, body)
            dispatch(userDataAction.submitToken(result.data.data.token))
            dispatch(userDataAction.submitPin(result.data.data.pin))
            dispatch(userDataAction.submitId(result.data.data.id))
            if(result.data.data.pin === null) {
                router.push('/user/createpin')
                return
            }
            setToastMsg(result.data.msg)
            setToastType('success')
            setShowToast(true)
            router.push('/dashboard')
        } catch (error) {
            setToastMsg(error.response.data.msg)
            setToastType('danger')
            setShowToast(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex justify-center items-center">
            <Aside />
            <main className="flex-1 relative bg-primary md:bg-white ">
                <section className="py-[5%] px-[10%] m-[5%] md:m-0 bg-white rounded-xl ">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold pb-5 md:pb-6 lg:pb-8 text-dark">Start Accessing Banking Needs
                        With All Devices and All Platforms
                        With 30.000+ Users</h1>
                    <p className="text-dark text-sm md:text-base opacity-60 pb-10  lg:pb-16">Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                    <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!email ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={mail} alt="mail" className={`w-5 h-auto ${email ? 'hidden' : 'block'}`} />
                            <Image src={mailFilled} alt="mail" className={`w-5 h-auto ${email ? 'block' : 'hidden'}`} />
                            <Image src={mailError} alt="mail" className="w-5 h-auto hidden" />
                            <input type="text" className="w-full outline-none text-sm md:text-base" name="email" placeholder="Enter your e-mail" onChange={(e) => inputHandler(e)} />
                        </div>
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!password ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={lock} alt="lock" className={`w-5 h-auto ${password ? 'hidden' : 'block'}`} />
                            <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${password ? 'block' : 'hidden'}`} />
                            <Image src={lockError} alt="lock" className="w-5 h-auto hidden" />
                            <input type={`${seePwd === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" name="password" placeholder="Enter your password" onChange={(e) => inputHandler(e)} />
                            <Image src={eye} alt="lock" className={`w-5 h-auto ${seePwd === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword} />
                            <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seePwd === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword} />
                        </div>
                    </div>
                    <p className="text-right pt-4 lg:pt-5 text-[#3a3d42] opacity-80 cursor-pointer text-sm md:text-base"><Link href={'/user/resetpassword'}>Forgot password?</Link></p>
                    <p className="text-center text-error font-semibold py-4 md:py-6 lg:py-8 invisible text-sm md:text-base">Email or Password Invalid</p>
                    <div>
                        <button type="button" className={`${email && password ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} onClick={generateLogin}>Login</button>
                        <div className={`${email && password ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Login</div>
                    </div>
                    <p className="text-center pt-6 lg:pt-10 text-dark text-sm md:text-base">Dont have an account? Let&apos;s <Link href={'/auth/register'} className="text-primary">Sign Up</Link></p>
                </section>
                {isLoading && <Loader />}
            </main>
            <Toast msg={toastMsg} isShow={showToast} toastType={toastType} showHandler={() => setShowToast(false)} />
        </section>
    )
}

export default Login