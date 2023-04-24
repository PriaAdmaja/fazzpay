import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import searchIcon from "../../assets/icons/search.svg"
import defaultAvatar from "../../assets/avatars/default-avatar.jpg"

const Transfer = () => {
    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-3/4 p-8 shadow-xl min-h-[678px]">
                    <p className="font-bold text-lg text-dark">Search Receiver</p>
                    <div className="p-4 bg-dark/10 rounded-xl flex gap-4 justify-start mt-6">
                        <Image src={searchIcon} alt="search" />
                        <input type="text" placeholder="Search receiver here" className="w-full bg-inherit " />
                    </div>
                    <div className="mt-8 flex flex-col gap-5">
                        <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <div className="w-12 h-12 rounded-md overflow-hidden relative">
                                <Image src={defaultAvatar} alt="avatar" className="object-cover" fill />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                                <p className="text-sm text-dark opacity-90 text-center">+628912345678</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <div className="w-12 h-12 rounded-md overflow-hidden relative">
                                <Image src={defaultAvatar} alt="avatar" className="object-cover" fill />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                                <p className="text-sm text-dark opacity-90 text-center">+628912345678</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <div className="w-12 h-12 rounded-md overflow-hidden relative">
                                <Image src={defaultAvatar} alt="avatar" className="object-cover" fill />
                            </div>
                            <div>
                                <p className="font-bold text-lg text-dark text-center">Pria Admaja</p>
                                <p className="text-sm text-dark opacity-90 text-center">+628912345678</p>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            <Footer />
        </>
    )
}

export default Transfer