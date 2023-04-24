import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import defaultAvatar from "../../../assets/avatars/default-avatar.jpg"
import pen from "../../../assets/icons/edit-2.svg"
import penFilled from "../../../assets/icons/edit-2-filled.svg"
import { useState } from "react"

const ReceiverId = () => {
    const [totalTransfer, setTotalTransfer] = useState(null)
    const [notes, setNotes] = useState(null)
    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-3/4 p-8 shadow-xl min-h-[678px]">
                    <p className="font-bold text-lg text-dark pb-6">Transfer Money</p>
                    <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                        <div className="w-12 h-12 rounded-md overflow-hidden relative">
                            <Image src={defaultAvatar} alt="avatar" className="object-cover" fill />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                            <p className="text-sm text-dark opacity-90 text-center">+628912345678</p>
                        </div>
                    </div>
                    <p className="pt-10 w-1/2 text-[#7A7886]">Type the amount you want to transfer and then
                        press continue to the next steps.</p>
                    <input type="number" placeholder="0.00" className="text-4xl mt-16 mb-10 text-center w-full outline-none font-bold text-dark" />
                    <p className="font-bold text-dark text-center">Rp120.000 Available</p>
                    <div className={`${notes ? 'border-primary' : 'border-[rgba(169,169,169,0.6)]'} border-b-[1.5px] border-solid flex justify-start gap-4 w-1/2 mx-auto pb-4 mt-16`}>
                        <Image src={pen} alt="notes" className={`${notes ? 'hidden' : 'block'} w-5 h-auto`} />
                        <Image src={penFilled} alt="notes" className={`${notes ? 'block' : 'hidden'} w-5 h-auto`} />
                        <input type="text" placeholder="Add some notes" className="w-full outline-none font-semibold" onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-primary py-4 px-12 text-white text-lg font-bold rounded-xl hover:bg-primary/75 mt-20 ">Continue</button>
                    </div>

                </section>
            </main>
            <Footer />
        </>
    )
}

export default ReceiverId