import Image from "next/image"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useEffect, useState } from "react"

import dashboard from "../assets/icons/grid.svg"
import dashboardActive from "../assets/icons/grid-active.svg"
import upArrow from "../assets/icons/arrow-up.svg"
import upArrowActive from "../assets/icons/arrow-up-active.svg"
import plusIcon from "../assets/icons/plus.svg"
import plusIconActive from "../assets/icons/plus-active.svg"
import profile from "../assets/icons/profile.svg"
import profileActive from "../assets/icons/profile-active.svg"
import logoutIcon from "../assets/icons/log-out.svg"
import { profileAction } from "@/redux/slice/profile"
import { userDataAction } from "@/redux/slice/userData"
import TopUp from "./Topup"

const Sidebar = () => {
    const [showTopup, setShowTopup] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const token = useSelector(state => state.userData.token)

    const topupHandler = () => {
        showTopup ? setShowTopup(false) : setShowTopup(true)
    }
    

    const logout = async() => {
        try {
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/auth/logout`
            await axios.post(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(userDataAction.clearData())
            dispatch(profileAction.clearData())
            router.push('/auth/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <aside className="rounded-xl bg-white py-6 md:py-12 w-full md:w-1/3 lg:w-1/4 flex md:flex-col items-start gap-5 sm:gap-10 shadow-xl justify-around md:justify-center">
            <div className={`${showTopup ? 'border-none' : router.pathname.split('/')[1] === 'dashboard' ? 'border-none border-l-4 md:border-solid border-l-primary' : 'border-none'} flex justify-start items-center gap-6 px-8 cursor-pointer`} onClick={() => router.push('/dashboard')}>
                <Image src={dashboard} alt="dashboard" className={`${showTopup ? "block" : router.pathname.split('/')[1] === 'dashboard' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={dashboardActive} alt="dashboard" className={`${showTopup ? 'hidden' : router.pathname.split('/')[1] === 'dashboard' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${showTopup ? 'text-dark' : router.pathname.split('/')[1] === 'dashboard' ? 'text-primary' : 'text-dark'} text-lg opacity-80 hidden md:block`}>Dashboard</p>
            </div>
            <div className={`${showTopup ? 'border-none' : router.pathname.split('/')[1] === 'transfer' ? 'border-none border-l-4 md:border-solid border-l-primary' : 'border-none'} cursor-pointer flex justify-start items-center gap-6 px-8`} onClick={() => router.push('/transfer')}>
                <Image src={upArrow} alt="transfer" className={`${showTopup ? 'block' : router.pathname.split('/')[1] === 'transfer' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={upArrowActive} alt="transfer" className={`${showTopup ? 'hidden' : router.pathname.split('/')[1] === 'transfer' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${showTopup ? 'text-dark' : router.pathname.split('/')[1] === 'transfer' ? 'text-primary' : 'text-dark'} text-lg opacity-80 hidden md:block`}>Transfer</p>
            </div>
            <div className={`${showTopup ? 'border-none border-l-4 md:border-solid border-l-primary' : 'border-none'} cursor-pointer flex justify-start items-center gap-6 px-8`} onClick={topupHandler}>
                <Image src={plusIcon} alt="topup" className={`${showTopup ? "hidden" : "block"} w-7 h-7`} />
                <Image src={plusIconActive} alt="topup" className={`${showTopup ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${showTopup ? 'text-primary' : 'text-dark'} text-lg opacity-80 hidden md:block`}>Top Up</p>
            </div>
            <div className={`${showTopup ? 'border-none' : router.pathname.split('/')[1] === 'profile' ? 'border-none border-l-4 md:border-solid border-l-primary' : 'border-none'} flex justify-start items-center gap-6 px-8 cursor-pointer`} onClick={() => router.push('/profile')}>
                <Image src={profile} alt="profile" className={`${showTopup ? 'block' : router.pathname.split('/')[1] === 'profile' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={profileActive} alt="profile" className={`${showTopup ? 'hidden' : router.pathname.split('/')[1] === 'profile' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${showTopup ? 'text-dark' : router.pathname.split('/')[1] === 'profile' ? 'text-primary' : 'text-dark'} text-lg opacity-80 hidden md:block`}>Profile</p>
            </div>
            <div className={`hidden md:flex border-none justify-start items-center gap-6 px-8 mt-auto cursor-pointer`} onClick={logout}>
                <Image src={logoutIcon} alt="logout" className={` w-7 h-7`} />
                <p className={`'text-dark' text-lg opacity-80`}>Logout</p>
            </div>
            <TopUp show={showTopup} showHandler={topupHandler} />
        </aside>
    )
}

export default Sidebar