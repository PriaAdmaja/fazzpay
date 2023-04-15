import Image from "next/image"

import avatar from "../assets/avatars/1.png"
import bell from "../assets/icons/bell.svg"

const Header = () => {
    return (
        <header className="py-[50px] px-[150px] flex shadow-lg rounded-2xl items-center select-none">
            <p className="font-bold text-primary text-3xl mr-auto cursor-pointer">FazzPay</p>
            <div className="flex justify-center items-center gap-8">
                <div className="flex justify-center items-center gap-5 cursor-pointer">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                        <Image src={avatar} alt="avatar" />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                        <p className="text-sm text-dark opacity-90 text-center">08123456789</p>
                    </div>
                </div>
                <Image src={bell} alt="notification" className="cursor-pointer"/>
            </div>
        </header>
    )
}

export default Header