import { useState } from "react"
import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import avatarExmp from "../../assets/avatars/1.png"

const History = () => {
    const [buttonText, setButtonText] = useState('-- Select Filter --')
    const [showFilter, setShowFilter] = useState(false)

    const selectFilter = (filter) => {
        setButtonText(filter)
        setShowFilter(false)
    }

    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className="flex flex-col justify-start items-center rounded-xl bg-white w-3/4 p-8 shadow-xl min-h-[678px]">
                    <div className="flex justify-between items-start w-full pb-9">
                        <p className="font-bold text-lg text-dark">Transaction History</p>
                        <div className="relative w-1/4">
                            <button type="button" className="px-7 py-2 bg-dark/10 text-sm rounded-lg w-full" onClick={() => setShowFilter(true)}>{buttonText}</button>
                            <div className={`absolute bg-gray-200 ${showFilter ? 'flex' : 'hidden'} flex-col w-full top-10 rounded-md overflow-hidden`}>
                                <button type="button" className="hover:bg-gray-300 py-1 text-sm" onClick={() => selectFilter('-- Week --')}>Week</button>
                                <button type="button" className="hover:bg-gray-300 py-1 text-sm" onClick={() => selectFilter('-- Month --')}>Month</button>
                                <button type="button" className="hover:bg-gray-300 py-1 text-sm" onClick={() => selectFilter('-- Year --')}>Year</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-10">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 overflow-hidden rounded-lg">
                                    <Image src={avatarExmp} alt="avatar" className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#4D4B57] pb-2">Samuel Suhi</p>
                                    <p className="text-[#7A7886] text-sm">Accept</p>
                                </div>
                            </div>
                            <p className="text-[#1EC15F] font-bold">+Rp50.000,-</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 overflow-hidden rounded-lg">
                                    <Image src={avatarExmp} alt="avatar" className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#4D4B57] pb-2">Samuel Suhi</p>
                                    <p className="text-[#7A7886] text-sm">Accept</p>
                                </div>
                            </div>
                            <p className="text-[#1EC15F] font-bold">+Rp50.000,-</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default History