import { useState } from "react"
import Aside from "@/components/Aside"
import Image from "next/image"

import mail from "../../assets/icons/mail.svg"
import mailFilled from "../../assets/icons/mail-filled.svg"
import mailError from "../../assets/icons/mail-error.svg"
import lock from "../../assets/icons/lock.svg"
import lockFilled from "../../assets/icons/lock-filled.svg"
import lockError from "../../assets/icons/lock-error.svg"
import user from "../../assets/icons/user.svg"
import userFilled from "../../assets/icons/user-filled.svg"
import eye from "../../assets/icons/eye.svg"
import eyeCrossed from "../../assets/icons/eye-crossed.svg"

const SignUp = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [seePwd, setSeePwd] = useState(false)

    const inputHandler = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
            return
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
            return
        }
        if (e.target.name === 'firstname') {
            setFirstname(e.target.value)
            return
        }
        if (e.target.name === 'lastname') {
            setLastname(e.target.value)
            return
        }
    }

    const showPassword = () => {
        seePwd === true ? setSeePwd(false) : setSeePwd(true)
    }
    return (
        <section className="flex justify-center items-center ">
            <Aside />
            <main className="flex-1 relative bg-primary md:bg-white h-full">
                <section className="py-[5%] px-[10%] m-[5%] md:m-0 bg-white rounded-xl">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold pb-5 md:pb-6 lg:pb-8 text-dark">Start Accessing Banking Needs
                        With All Devices and All Platforms
                        With 30.000+ Users</h1>
                    <p className="text-dark text-sm md:text-base opacity-60 pb-10  lg:pb-16">Transfering money is eassier than ever, you can access FazzPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                    <div className="flex flex-col gap-8 lg:gap-12 pb-10">
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!firstname ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={user} alt="user" className={`w-5 h-auto ${firstname ? 'hidden' : 'block'}`} />
                            <Image src={userFilled} alt="user" className={`w-5 h-auto ${firstname ? 'block' : 'hidden'}`} />
                            <input type="text" className="w-full outline-none text-sm md:text-base" name="firstname" placeholder="Enter your firstname" onChange={(e) => inputHandler(e)} />
                        </div>
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!lastname ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={user} alt="user" className={`w-5 h-auto ${lastname ? 'hidden' : 'block'}`} />
                            <Image src={userFilled} alt="user" className={`w-5 h-auto ${lastname ? 'block' : 'hidden'}`} />
                            <input type="text" className="w-full outline-none text-sm md:text-base" name="lastname" placeholder="Enter your lastname" onChange={(e) => inputHandler(e)} />
                        </div>
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!email ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={mail} alt="mail" className={`w-5 h-auto ${email ? 'hidden' : 'block'}`} />
                            <Image src={mailFilled} alt="mail" className={`w-5 h-auto ${email ? 'block' : 'hidden'}`} />
                            <input type="text" className="w-full outline-none text-sm md:text-base" name="email" placeholder="Enter your email" onChange={(e) => inputHandler(e)} />
                        </div>
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!password ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={lock} alt="lock" className={`w-5 h-auto ${password ? 'hidden' : 'block'}`} />
                            <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${password ? 'block' : 'hidden'}`} />
                            <input type={`${seePwd === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" name="password" placeholder="Enter your password" onChange={(e) => inputHandler(e)} />
                            <Image src={eye} alt="lock" className={`w-5 h-auto ${seePwd === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword} />
                            <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seePwd === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword} />
                        </div>
                    </div>
                    <div>
                        <button type="button" className={`${email && password && firstname && lastname ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} >Sign Up</button>
                        <div className={`${email && password && firstname && lastname ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Sign Up</div>
                    </div>
                    <p className="text-center pt-4 lg:pt-6 text-dark text-sm md:text-base">Already have an account? Let's <button type="button" className="text-primary">Login</button></p>
                </section>
            </main>
        </section>
    )
}

export default SignUp