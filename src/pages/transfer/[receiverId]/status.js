import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import success from "../../../assets/icons/check.svg"
import failed from "../../../assets/icons/x.svg"
import Image from "next/image"
import { useState } from "react"
import defaultAvatar from "../../../assets/avatars/default-avatar.jpg"
import download from "../../../assets/icons/download.svg"

const Status = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const date = new Date()
    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-3/4 p-8 shadow-xl min-h-[678px]">
                    <section className="pt-7 pb-[55px]">
                        <div className={`${isSuccess ? 'block' : 'hidden'}`}>
                            <div className="w-[70px] h-[70px] bg-[#1EC15F] rounded-full flex justify-center items-center mx-auto">
                                <Image src={success} alt="success" />
                            </div>
                            <p className="text-xl text-dark font-bold pt-7 text-center">Transfer Success</p>
                        </div>
                        <div className={`${isSuccess ? 'hidden' : 'block'}`}>
                            <div className="w-[70px] h-[70px] bg-[#FF5B37] rounded-full flex justify-center items-center mx-auto">
                                <Image src={failed} alt="failed" />
                            </div>
                            <p className="text-xl text-dark font-bold pt-7 pb-5 text-center">Transfer Failed</p>
                            <p className="text-[#7A7886] w-4/5 text-center mx-auto">We can’t transfer your money at the moment, we recommend you to check your internet connection and try again.</p>
                        </div>
                    </section>
                    <div className="flex flex-col gap-5">
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Amount</p>
                            <p className="font-bold text-xl text-[#514F5B]">Rp100.000</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Balance Left</p>
                            <p className="font-bold text-xl text-[#514F5B]">Rp100.000</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Date & Time</p>
                            <p className="font-bold text-xl text-[#514F5B]">{date.toLocaleString()}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Notes</p>
                            <p className="font-bold text-xl text-[#514F5B]">For dinner</p>
                        </div>

                    </div>
                    <div className="cursor-pointer rounded-xl w-full mt-10">
                        <p className="text-[#514F5B] pb-2 font-bold text-xl">Transfer to</p>
                        <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl w-full">
                            <div className="w-12 h-12 rounded-md overflow-hidden relative">
                                <Image src={defaultAvatar} alt="avatar" className="object-cover" fill />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                                <p className="text-sm text-dark opacity-90 text-center">+628912345678</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[100px] flex justify-end items-center gap-5">
                        <button type="button" className={`bg-primaryOpct text-primary justify-center items-center gap-5 py-4 px-10 rounded-xl ${isSuccess ? 'flex' : 'hidden'}`}>
                            <Image src={download} alt="download" />
                            <p className="text-lg font-bold">Download PDF</p>
                        </button>
                        <button type="button" className={`bg-primary rounded-xl py-4 px-10 text-white text-lg font-bold ${isSuccess ? 'block' : 'hidden'}`}>Back To Home</button>
                        <button type="button" className={`${isSuccess ? 'hidden' : 'block'} bg-primary rounded-xl py-4 px-10 text-white text-lg font-bold`}>Try Again</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Status