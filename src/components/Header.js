import Image from "next/image"
import { useSelector } from "react-redux"

import bell from "../assets/icons/bell.svg"
import defaultAvatar from "../assets/avatars/default-avatar.jpg"

const Header = () => {
    const profile = useSelector(state => state.profile.profile)

    return (
        <header className="py-[50px] px-[150px] flex shadow-lg rounded-2xl items-center select-none relative z-10">
            <p className="font-bold text-primary text-3xl mr-auto cursor-pointer">FazzPay</p>
            <div className="flex justify-center items-center gap-8">
                <div className="flex justify-center items-center gap-5 cursor-pointer">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                        <Image src={profile.image || defaultAvatar} alt="avatar" />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-dark text-center">{profile.firstName} {profile.lastName}</p>
                        <p className="text-sm text-dark opacity-90 text-center">{profile.noTelp}</p>
                    </div>
                </div>
                <Image src={bell} alt="notification" className="cursor-pointer" />
            </div>
        </header>
    )
}

export default Header