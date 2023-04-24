import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import defaultAvatar from "../../../assets/avatars/default-avatar.jpg"
import PinConfirmation from "@/components/PinConfirmation"
import { useState } from "react"

const Confirmation = () => {
    const [showPin, setShowPin] = useState(false)
    const date = new Date()

    const showHandler = () => {
        showPin ? setShowPin(false) : setShowPin(true)
    }
    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-3/4 p-8 shadow-xl min-h-[678px]">
                    <p className="font-bold text-lg text-dark pb-6">Transfer To</p>
                    <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                        <div className="w-12 h-12 rounded-md overflow-hidden relative">
                            <Image src={defaultAvatar} alt="avatar" className="object-cover" fill />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                            <p className="text-sm text-dark opacity-90 text-center">+628912345678</p>
                        </div>
                    </div>
                    <p className="font-bold text-lg text-dark pb-6 pt-10">Details</p>
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
                    <div className="flex justify-end mt-16">
                        <button type="button" className="bg-primary py-4 px-12 text-white text-lg font-bold rounded-xl hover:bg-primary/75 " onClick={showHandler}>Continue</button>
                    </div>

                </section>
            </main>
            <Footer />
            <PinConfirmation show={showPin} showHandler={showHandler} />
        </>
    )
}

export default Confirmation