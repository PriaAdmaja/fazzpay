import { useState } from "react"
import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import phone from "../../assets/icons/phone.svg"
import phoneFilled from "../../assets/icons/phone-filled.svg"

const PhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState(null)

    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className="p-8 rounded-xl bg-white w-3/4 shadow-xl">
                    <h1 className="font-bold text-lg pb-6 text-dark">Edit Phone Number</h1>
                    <p className="pb-10 text-[#7a7886] w-1/2">Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
                    <div className="w-1/2 mx-auto pb-[200px]">
                        <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                            <div className={`flex justify-start items-center gap-3 border-b-[1.5px] border-solid ${!phoneNumber ? 'border-b-accent' : 'border-b-primary'}  pb-4`}>
                                <Image src={phone} alt="mail" className={`w-5 h-auto ${phoneNumber ? 'hidden' : 'block'}`} />
                                <Image src={phoneFilled} alt="mail" className={`w-5 h-auto ${phoneNumber ? 'block' : 'hidden'}`} />
                                <p>+62</p>
                                <input type="text" className="w-full outline-none text-sm md:text-base" name="email" placeholder="Enter your phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="pt-[70px]">
                            <button type="button" className={`${phoneNumber ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} >Edit Phone Number</button>
                            <div className={`${phoneNumber ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Edit Phone Number</div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default PhoneNumber