import { useState } from "react"
import Aside from "@/components/Aside"
import Image from "next/image"

import lock from "../../assets/icons/lock.svg"
import lockFilled from "../../assets/icons/lock-filled.svg"
import eye from "../../assets/icons/eye.svg"
import eyeCrossed from "../../assets/icons/eye-crossed.svg"

const NewPasword = () => {
    const [password, setPassword] = useState(null)
    const [rePassword, setRePassword] = useState(null)
    const [seePwd1, setSeePwd1] = useState(false)
    const [seePwd2, setSeePwd2] = useState(false)

    const showPassword1 = () => {
        seePwd1 === true ? setSeePwd1(false) : setSeePwd1(true)
    }

    const showPassword2 = () => {
        seePwd2 === true ? setSeePwd2(false) : setSeePwd2(true)
    }

    return (
        <section className="flex justify-center items-center">
            <Aside />
            <main className="flex-1 relative bg-primary md:bg-white ">
                <section className="py-[5%] px-[10%] m-[5%] md:m-0 bg-white rounded-xl ">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold pb-5 md:pb-6 lg:pb-8 text-dark">Did You Forgot Your Password?
                        Don’t Worry, You Can Reset Your
                        Password In a Minutes.</h1>
                    <p className="text-dark text-sm md:text-base opacity-60 pb-10  lg:pb-16">Now you can create a new password for your FazzPay account. Type your password twice so we can confirm your new passsword.</p>
                    <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!password ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={lock} alt="lock" className={`w-5 h-auto ${password ? 'hidden' : 'block'}`} />
                            <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${password ? 'block' : 'hidden'}`} />
                            <input type={`${seePwd1 === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                            <Image src={eye} alt="lock" className={`w-5 h-auto ${seePwd1 === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword1} />
                            <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seePwd1 === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword1} />
                        </div>
                        <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!password ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                            <Image src={lock} alt="lock" className={`w-5 h-auto ${rePassword ? 'hidden' : 'block'}`} />
                            <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${rePassword ? 'block' : 'hidden'}`} />
                            <input type={`${seePwd2 === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" name="password" placeholder="Enter your password" onChange={(e) => setRePassword(e.target.value)} />
                            <Image src={eye} alt="lock" className={`w-5 h-auto ${seePwd2 === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword2} />
                            <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seePwd2 === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showPassword2} />
                        </div>
                    </div>
                    <div className="pt-[90px]">
                        <button type="button" className={`${password && rePassword ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} >Confirm</button>
                        <div className={`${password && rePassword ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Confirm</div>
                    </div>
                </section>
            </main>
        </section>
    )
}

export default NewPasword