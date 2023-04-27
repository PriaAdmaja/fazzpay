import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import defaultAvatar from "../../../assets/avatars/default-avatar.jpg"
import pen from "../../../assets/icons/edit-2.svg"
import penFilled from "../../../assets/icons/edit-2-filled.svg"
import Loader from "@/components/Loader"
import { transferInfoAction } from "@/redux/slice/transferInfo"
import authCheck from "@/utils/AuthCheck"
import Head from "next/head"

const ReceiverId = () => {
    const [totalTransfer, setTotalTransfer] = useState(null)
    const [notes, setNotes] = useState(null)
    const [receiverData, setReceiverData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const token = useSelector(state => state.userData.token)
    const balance = useSelector(state => state.profile.profile.balance)
    const router = useRouter()
    const receiverId = router.query.receiverId
    const dispatch = useDispatch()

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

    const confirmation = () => {
        setIsLoading(true)
        const transfer = {
            receiverId,
            amount: totalTransfer,
            notes
        }
        dispatch(transferInfoAction.submitTransfer(transfer))
        router.push(`/transfer/${receiverId}/confirmation`)
        setIsLoading(false)
    }

    return (
        <>
            <Head>
                <title>FazzPay | Transfer</title>
            </Head>
            <Header />
            <main className="flex flex-col md:flex-row gap-4 bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-full md:w-2/3 lg:w-3/4 p-8 shadow-xl min-h-[678px]">
                    <p className="font-bold text-lg text-dark pb-6">Transfer Money</p>
                    <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-5 rounded-xl">
                        <div className="w-12 h-12 rounded-md overflow-hidden relative">
                            <Image src={!receiverData?.image ? defaultAvatar : `${process.env.NEXT_PUBLIC_AVATAR}${receiverData.image}`} alt="avatar" className="object-cover" fill />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-dark text-center">{receiverData?.firstName} {receiverData?.lastName}</p>
                            <p className="text-sm text-dark opacity-90 text-center">{receiverData?.noTelp}</p>
                        </div>
                    </div>
                    <p className="pt-10 w-full md:w-2/3 lg:w-1/2 text-[#7A7886]">Type the amount you want to transfer and then
                        press continue to the next steps.</p>
                    <input type="number" min='0' placeholder="0" className={`text-4xl mt-16 mb-10 text-center w-full outline-none font-bold text-primary`} onChange={(e) => setTotalTransfer(e.target.value)} />
                    <p className="font-bold text-dark text-center">Rp{balance.toLocaleString()} Available</p>
                    <div className={`${notes ? 'border-primary' : 'border-[rgba(169,169,169,0.6)]'} border-b-[1.5px] border-solid flex justify-start gap-4 w-full md:w-2/3 lg:w-1/2 mx-auto pb-4 mt-16`}>
                        <Image src={pen} alt="notes" className={`${notes ? 'hidden' : 'block'} w-5 h-auto`} />
                        <Image src={penFilled} alt="notes" className={`${notes ? 'block' : 'hidden'} w-5 h-auto`} />
                        <input type="text" placeholder="Add some notes" className="w-full outline-none font-semibold" onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-primary py-4 px-12 text-white text-lg font-bold rounded-xl hover:bg-primary/75 mt-20 " onClick={confirmation}>Continue</button>
                    </div>
                    {isLoading && <Loader />}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default authCheck(ReceiverId)