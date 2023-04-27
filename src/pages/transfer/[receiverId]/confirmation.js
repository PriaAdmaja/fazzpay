import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import defaultAvatar from "../../../assets/avatars/default-avatar.jpg"
import PinConfirmation from "@/components/PinConfirmation"
import Loader from "@/components/Loader"
import { useSelector } from "react-redux"
import authCheck from "@/utils/AuthCheck"
import Head from "next/head"

const Confirmation = () => {
    const [showPin, setShowPin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [receiverData, setReceiverData] = useState(null)
    

    const date = new Date()
    const {receiverId, amount, notes} = useSelector(state => state.transferInfo.transferInfo)
    const token = useSelector(state => state.userData.token)
    const {balance} = useSelector(state => state.profile.profile)

    useEffect(() => {
        let getData = true
        if (getData === true) {
            setIsLoading(true)
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/profile/${receiverId}`
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setReceiverData(res.data.data)).catch(err => console.log(err)).finally(() => setIsLoading(false))
        }
        return () => { getData = false }

    }, [receiverId])

    const showHandler = () => {
        showPin ? setShowPin(false) : setShowPin(true)
    }
    return (
        <>
        <Head>
            <title>FazzPay || Transfer</title>
        </Head>
            <Header />
            <main className="flex flex-col md:flex-row gap-4 bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-full md:w-2/3 lg:w-3/4 p-8 shadow-xl min-h-[678px]">
                    <p className="font-bold text-lg text-dark pb-6">Transfer To</p>
                    <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                    <div className="w-12 h-12 rounded-md overflow-hidden relative">
                            <Image src={!receiverData?.image ? defaultAvatar : `${process.env.NEXT_PUBLIC_AVATAR}${receiverData.image}`} alt="avatar" className="object-cover" fill />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-dark text-center">{receiverData?.firstName} {receiverData?.lastName}</p>
                            <p className="text-sm text-dark opacity-90 text-center">{receiverData?.noTelp}</p>
                        </div>
                    </div>
                    <p className="font-bold text-lg text-dark pb-6 pt-10">Details</p>
                    <div className="flex flex-col gap-5">
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-3 md:p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Amount</p>
                            <p className="font-bold text-base md:text-xl text-[#514F5B]">Rp{amount}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-3 md:p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Balance Left</p>
                            <p className="font-bold text-base md:text-xl text-[#514F5B]">Rp{balance.toLocaleString()}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-3 md:p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Date & Time</p>
                            <p className="font-bold text-base md:text-xl text-[#514F5B]">{date.toLocaleString()}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-3 md:p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Notes</p>
                            <p className="font-bold text-base md:text-xl text-[#514F5B]">{notes}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-16">
                        <button type="button" className="bg-primary py-4 px-12 text-white text-lg font-bold rounded-xl hover:bg-primary/75 " onClick={showHandler}>Continue</button>
                    </div>
                    {isLoading && <Loader />}
                </section>
            </main>
            <Footer />
            <PinConfirmation show={showPin} showHandler={showHandler} />
        </>
    )
}

export default authCheck( Confirmation)