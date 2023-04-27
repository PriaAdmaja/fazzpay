import Image from "next/image"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import axios from "axios"

import bell from "../assets/icons/bell.svg"
import defaultAvatar from "../assets/avatars/default-avatar.jpg"
import { useState } from "react"

import income from "../assets/icons/arrow-income.svg"
import expense from "../assets/icons/arrow-expense.svg"

const Header = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [notif, setNotif] = useState([])
    const [showNotif, setShowNotif] = useState(false)
    const profile = useSelector(state => state.profile.profile)
    const avatar = `${process.env.NEXT_PUBLIC_AVATAR}${profile.image}`

    const { token } = useSelector(state => state.userData)

    const router = useRouter()

    const openNotiv = async () => {
        if(showNotif === true) {
            setShowNotif(false)
            return
        }
        try {
            setShowNotif(true)
            setIsLoading(true)
            const urlHistory = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/transaction/history?page=1&limit=5&filter=WEEK`
            const result = await axios.get(urlHistory, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setNotif(result.data.data)

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <header className="p-[5%] lg:py-[50px] lg:px-[100px] xl:px-[150px] flex shadow-lg rounded-2xl items-center select-none relative z-10">
            <p className="font-bold text-primary text-xl md:text-3xl mr-auto cursor-pointer" onClick={() => router.push('/dashboard')}>FazzPay</p>
            <div className="flex justify-center items-center gap-4 md:gap-8 relative">
                <div className="flex justify-center items-center gap-5 cursor-pointer" onClick={() => router.push('/profile')}>
                    <div className="w-12 h-12 rounded-md overflow-hidden relative">
                        <Image src={profile.image ? avatar : defaultAvatar} alt="avatar" className="object-cover" fill />
                    </div>
                    <div className="cursor-pointer hidden md:block">
                        <p className="font-bold text-lg text-dark text-center">{profile.firstName} {profile.lastName}</p>
                        <p className="text-sm text-dark opacity-90 text-center">+62{profile.noTelp}</p>
                    </div>
                </div>
                <Image src={bell} alt="notification" className="cursor-pointer" onClick={openNotiv} />
                <div className={`${showNotif ? 'flex' : 'hidden'} absolute  w-[320px] rounded-xl top-20 md:top-28 right-0 p-5 bg-white flex-col gap-5 shadow-xl`}>
                    {notif.map((data, i) => {
    
                        return (
                            <div key={i} className="flex gap-4 py-5 px-6 bg-white rounded-lg shadow-lg">
                                <Image src={data.type === 'accept' ? income : expense} alt="icon" />
                                <div>
                                    <p className="text-sm text-[#7a7a7a]">{data.type === 'send' ? `Transfer to ${data.firstName} ${data.lastName}` : `Accept from ${data.firstName} ${data.lastName}`}</p>
                                    <p className="text-[#43484F] text-lg font-semibold">Rp{data.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </header>
    )
}

export default Header