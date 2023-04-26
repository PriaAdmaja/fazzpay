import Image from "next/image"
import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Loader from "@/components/Loader"
import Toast from "@/components/Toast"

import lock from "../../assets/icons/lock.svg"
import lockFilled from "../../assets/icons/lock-filled.svg"
import eye from "../../assets/icons/eye.svg"
import eyeCrossed from "../../assets/icons/eye-crossed.svg"


const ChangePassword = () => {
    const [curPassword, setCurPassword] = useState(null)
    const [seeCurPassword, setSeeCurPassword] = useState(false)
    const [newPassword, setNewPassword] = useState(null)
    const [seeNewPassword, setSeeNewPassword] = useState(false)
    const [reNewPassword, setReNewPassword] = useState(null)
    const [seeReNewPassword, setSeeReNewPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const router = useRouter()

    const {id, token} = useSelector(state => state.userData)

    const curPasswordHandler = (e) => {
        setCurPassword(e.target.value)
    }

    const showCurPassword = () => {
        seeCurPassword === false ? setSeeCurPassword(true) : setSeeCurPassword(false)
    }

    const newPasswordHandler = (e) => {
        setNewPassword(e.target.value)
    }

    const showNewPassword = () => {
        seeNewPassword === false ? setSeeNewPassword(true) : setSeeNewPassword(false)
    }

    const reNewPasswordHandler = (e) => {
        setReNewPassword(e.target.value)
    }

    const showReNewPassword = () => {
        seeReNewPassword === false ? setSeeReNewPassword(true) : setSeeReNewPassword(false)
    }

    const updatePassword = async() => {
        try {
            setIsLoading(true)
            const body = {
                oldPassword: curPassword,
                newPassword,
                confirmPassword: reNewPassword
            }
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/password/${id}`
            const result = await axios.patch(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setShowToast(true)
            setToastMsg(result.data.msg)
            setToastType('success')
            setTimeout(() => {
                router.push('/profile')
            }, 3000)
        } catch (error) {
            setShowToast(true)
            setToastMsg(error.response.data.msg)
            setToastType('danger')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <main className="flex flex-col md:flex-row gap-4 bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className="p-8 rounded-xl bg-white w-full md:w-3/4 shadow-xl">
                    <h1 className="font-bold text-lg pb-6 text-dark">Change Password</h1>
                    <p className="pb-10 text-[#7a7886] w-full md:w-2/3 lg:w-1/2">You must enter your current password and then type your new password twice.</p>
                    <div className="w-[90%] md:w-2/3 lg:w-1/2 mx-auto">
                        <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                            <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!curPassword ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                                <Image src={lock} alt="lock" className={`w-5 h-auto ${curPassword ? 'hidden' : 'block'}`} />
                                <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${curPassword ? 'block' : 'hidden'}`} />
                                <input type={`${seeCurPassword === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" placeholder="Current password" onChange={(e) => curPasswordHandler(e)} />
                                <Image src={eye} alt="lock" className={`w-5 h-auto ${seeCurPassword === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showCurPassword} />
                                <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seeCurPassword === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showCurPassword} />
                            </div>
                            <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!newPassword ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                                <Image src={lock} alt="lock" className={`w-5 h-auto ${newPassword ? 'hidden' : 'block'}`} />
                                <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${newPassword ? 'block' : 'hidden'}`} />
                                <input type={`${seeNewPassword === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" placeholder="New password" onChange={(e) => newPasswordHandler(e)} />
                                <Image src={eye} alt="lock" className={`w-5 h-auto ${seeNewPassword === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showNewPassword} />
                                <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seeNewPassword === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showNewPassword} />
                            </div>
                            <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!reNewPassword ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                                <Image src={lock} alt="lock" className={`w-5 h-auto ${reNewPassword ? 'hidden' : 'block'}`} />
                                <Image src={lockFilled} alt="lock" className={`w-5 h-auto ${reNewPassword ? 'block' : 'hidden'}`} />
                                <input type={`${seeReNewPassword === true ? 'text' : 'password'}`} className="w-full outline-none text-sm md:text-base" placeholder="Repeat new password" onChange={(e) => reNewPasswordHandler(e)} />
                                <Image src={eye} alt="lock" className={`w-5 h-auto ${seeReNewPassword === true ? 'block' : 'hidden'} cursor-pointer`} onClick={showReNewPassword} />
                                <Image src={eyeCrossed} alt="lock" className={`w-5 h-auto ${seeReNewPassword === false ? 'block' : 'hidden'} cursor-pointer`} onClick={showReNewPassword} />
                            </div>
                        </div>
                        <div className="mt-[70px]">
                            <button type="button" className={`${curPassword && newPassword && reNewPassword ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} onClick={updatePassword}>Change Password</button>
                            <div className={`${curPassword && newPassword && reNewPassword ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Change Password</div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            {isLoading && <Loader />}
            <Toast msg={toastMsg} isShow={showToast} toastType={toastType} showHandler={() => setShowToast(false)} />
        </>
    )
}

export default ChangePassword