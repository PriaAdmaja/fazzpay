import Image from "next/image"
import { useRouter } from "next/router"

import dashboard from "../assets/icons/grid.svg"
import dashboardActive from "../assets/icons/grid-active.svg"
import upArrow from "../assets/icons/arrow-up.svg"
import upArrowActive from "../assets/icons/arrow-up-active.svg"
import plusIcon from "../assets/icons/plus.svg"
import plusIconActive from "../assets/icons/plus-active.svg"
import profile from "../assets/icons/profile.svg"
import profileActive from "../assets/icons/profile-active.svg"
import logout from "../assets/icons/log-out.svg"

const Sidebar = () => {
    const router = useRouter()
    return (
        <aside className="rounded-xl bg-white py-12 w-1/4 flex flex-col items-start gap-10 shadow-xl">
            <div className={`${router.pathname === '/home' ? 'border-l-4 border-solid border-l-primary' : 'border-none'} flex justify-start items-center gap-6 px-8 cursor-pointer`}>
                <Image src={dashboard} alt="dashboard" className={`${router.pathname === '/home' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={dashboardActive} alt="dashboard" className={`${router.pathname === '/home' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${router.pathname === '/home' ? 'text-primary' : 'text-dark'} text-lg opacity-80`}>Dashboard</p>
            </div>
            <div className={`${router.pathname === '/transfer' ? 'border-l-4 border-solid border-l-primary' : 'border-none'} cursor-pointer flex justify-start items-center gap-6 px-8`}>
                <Image src={upArrow} alt="transfer" className={`${router.pathname === '/transfer' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={upArrowActive} alt="transfer" className={`${router.pathname === '/transfer' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${router.pathname === '/transfer' ? 'text-primary' : 'text-dark'} text-lg opacity-80`}>Transfer</p>
            </div>
            <div className={`${router.pathname === '/topup' ? 'border-l-4 border-solid border-l-primary' : 'border-none'} cursor-pointer flex justify-start items-center gap-6 px-8`}>
                <Image src={plusIcon} alt="topup" className={`${router.pathname === '/topup' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={plusIconActive} alt="topup" className={`${router.pathname === '/topup' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${router.pathname === '/topup' ? 'text-primary' : 'text-dark'} text-lg opacity-80`}>Top Up</p>
            </div>
            <div className={`${router.pathname.split('/')[1] === 'profile' ? 'border-l-4 border-solid border-l-primary' : 'border-none'} flex justify-start items-center gap-6 px-8 cursor-pointer`}>
                <Image src={profile} alt="dashboard" className={`${router.pathname.split('/')[1] === 'profile' ? "hidden" : "block"} w-7 h-7`} />
                <Image src={profileActive} alt="dashboard" className={`${router.pathname.split('/')[1] === 'profile' ? "block" : "hidden"} w-7 h-7`} />
                <p className={`${router.pathname.split('/')[1] === 'profile' ? 'text-primary' : 'text-dark'} text-lg opacity-80`}>Profile</p>
            </div>
            <div className={`'border-none' flex justify-start items-center gap-6 px-8 mt-auto cursor-pointer`}>
                <Image src={logout} alt="dashboard" className={` w-7 h-7`} />
                <p className={`'text-dark' text-lg opacity-80`}>Logout</p>
            </div>
        </aside>
    )
}

export default Sidebar