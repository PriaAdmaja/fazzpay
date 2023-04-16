import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import avatar from "../../assets/avatars/1.png"
import pen from "../../assets/icons/edit-2.svg"
import rightArrow from "../../assets/icons/arrow-left.svg"

const Profile = () => {
    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className="flex flex-col justify-center items-center rounded-xl bg-white w-3/4 py-12 shadow-xl">
                    <div className="flex flex-col gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden ">
                            <Image src={avatar} alt="avatar" className="object-cover" />
                        </div>
                        <div className="flex justify-center items-center gap-3 cursor-pointer">
                            <Image src={pen} alt="edit" className="w-3 h-3"/>
                            <p className="text-[#7a7886]">Edit</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-dark pt-4 pb-2">Robert Candler</p>
                    <p className="pb-12">08123456789</p>
                    <div className="w-1/2 flex flex-col justify-center items-center gap-5">
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer">
                            <p>Personal Information</p>
                            <Image src={rightArrow} alt="arrow" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer">
                            <p>Change Password</p>
                            <Image src={rightArrow} alt="arrow" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer">
                            <p>Change PIN</p>
                            <Image src={rightArrow} alt="arrow" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer">
                            <p>Logout</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Profile