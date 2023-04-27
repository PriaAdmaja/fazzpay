import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import success from "../../../assets/icons/check.svg"
import failed from "../../../assets/icons/x.svg"
import Image from "next/image"
import { useEffect, useState } from "react"
import defaultAvatar from "../../../assets/avatars/default-avatar.jpg"
import download from "../../../assets/icons/download.svg"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Loader from "@/components/Loader"
import { transactionStatusAction } from "@/redux/slice/transactionStatus"
import { transferInfoAction } from "@/redux/slice/transferInfo"
import { useRouter } from "next/router"
import PinConfirmation from "@/components/PinConfirmation"
import authCheck from "@/utils/AuthCheck"
import Head from "next/head"

const Status = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [receiverData, setReceiverData] = useState({})
    const [showPin, setShowPin] = useState(false)

    const { transactionInfo } = useSelector(state => state.transactionStatus)
    const { token } = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        let getData = true
        if (getData) {
            setIsLoading(true)
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/profile/${transactionInfo.receiverId}`
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setReceiverData(res.data.data)).catch(err => console.log(err)).finally(() => setIsLoading(false))
        }
        return () => { getData = false }
    }, [])

    const date = new Date()

    const showHandler = () => {
        showPin ? setShowPin(false) : setShowPin(true)
    }

    const clearTransaction = () => {
        dispatch(transactionStatusAction.clearData())
        dispatch(transferInfoAction.clearData())
        router.push('/dashboard')
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
                    <section className="pt-7 pb-[55px]">
                        <div className={`${transactionInfo.status === 'success' ? 'block' : 'hidden'}`}>
                            <div className="w-[70px] h-[70px] bg-[#1EC15F] rounded-full flex justify-center items-center mx-auto">
                                <Image src={success} alt="success" />
                            </div>
                            <p className="text-xl text-dark font-bold pt-7 text-center">Transfer Success</p>
                        </div>
                        <div className={`${transactionInfo.status === 'success' ? 'hidden' : 'block'}`}>
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
                            <p className="font-bold text-xl text-[#514F5B]">Rp{transactionInfo.amount?.toLocaleString()}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Balance Left</p>
                            <p className="font-bold text-xl text-[#514F5B]">Rp{transactionInfo.balance?.toLocaleString()}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Date & Time</p>
                            <p className="font-bold text-xl text-[#514F5B]">{date.toLocaleString()}</p>
                        </div>
                        <div className="cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                            <p className="text-[#7a7886] pb-2">Notes</p>
                            <p className="font-bold text-xl text-[#514F5B]">{transactionInfo.notes}</p>
                        </div>

                    </div>
                    <div className="cursor-pointer rounded-xl w-full mt-10">
                        <p className="text-[#514F5B] pb-2 font-bold text-xl">Transfer to</p>
                        <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl w-full">
                            <div className="w-12 h-12 rounded-md overflow-hidden relative">
                                <Image src={!receiverData.image ? defaultAvatar : `${process.env.NEXT_PUBLIC_AVATAR}${receiverData.image}`} alt="avatar" className="object-cover" fill />
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="font-bold text-lg text-dark text-center">{receiverData.firstName} {receiverData.lastName}</p>
                                <p className="text-sm text-dark opacity-90 text-center">{receiverData.noTelp}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[100px] flex justify-end items-center gap-5">
                        <button type="button" className={`bg-primaryOpct text-primary justify-center items-center gap-3 sm:gap-5 py-3 sm:py-4 px-5 sm:px-7 lg:px-10 rounded-xl ${transactionInfo.status === 'success' ? 'flex' : 'hidden'}`}>
                            <Image src={download} alt="download" />
                            <p className="text-base lg:text-lg font-medium sm:font-semibold lg:font-bold">Download PDF</p>
                        </button>
                        <button type="button" className={`bg-primary rounded-xl py-3 sm:py-4 px-5 sm:px-6 lg:px-10 text-white text-base lg:text-lg font-medium sm:font-semibold lg:font-bold ${transactionInfo.status === 'success' ? 'block' : 'hidden'}`} onClick={clearTransaction}>Back To Home</button>
                        <button type="button" className={`${transactionInfo.status === 'success' ? 'hidden' : 'block'} bg-primary rounded-xl py-2 lg:py-4 px-6 lg:px-10 text-white text-base lg:text-lg font-medium lg:font-bold`} onClick={() => setShowPin(true)}>Try Again</button>
                    </div>
                    {isLoading && <Loader />}
                </section>
            </main>
            <Footer />
            <PinConfirmation show={showPin} showHandler={showHandler} />
        </>
    )
}

export default authCheck(Status)