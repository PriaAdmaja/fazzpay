import Image from "next/image"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"

import upIcon from "../../assets/icons/arrow-up-accent.svg"
import plusIcon from "../../assets/icons/plus-accent.svg"
import arrowIncome from "../../assets/icons/arrow-income.svg"
import arrowExpense from "../../assets/icons/arrow-expense.svg"
import { profileAction } from "@/redux/slice/profile"
import Loader from "@/components/Loader"
import TopUp from "@/components/Topup"

import { AuthCheck } from "@/utils/authCheck"

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataDashboard, setDataDashboard] = useState({})
    const [dataHistory, setDataHistory] = useState([])
    const [showTopup, setShowTopup] = useState(false)

    const router = useRouter()
    const id = useSelector((state) => state.userData.id)
    const token = useSelector((state) => state.userData.token)
    const phoneNumber = useSelector((state) => state.profile.profile.noTelp)
    const dispatch = useDispatch()

    useEffect(() => {
        let getData = true
        if (getData === true) {
            setIsLoading(true)
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/profile/${id}`
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => dispatch(profileAction.submitProfile(res.data.data)))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false))

            const urlDashboard = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/dashboard/${id}`
            axios.get(urlDashboard, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setDataDashboard(res.data.data))
                .catch(error => console.log(error))

            const urlHistory = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/transaction/history?page=1&limit=4`
            axios.get(urlHistory, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setDataHistory(res.data.data)).catch(err => console.log(err))
        }
        return () => { getData = false }
    }, [id])

    const topupHandler = () => {
        showTopup ? setShowTopup(false) : setShowTopup(true)
    }

    const { listIncome, listExpense } = dataDashboard

    let total = 0
    const chart = []
    listIncome?.map((data, i) => {
        total += data.total
        total -= listExpense[i].total
        chart.push({ "day": data.day, "balance": total })
    })
    const maxValue = [...chart].sort((a, b) => b.balance - a.balance)[0]?.balance

    let balance = Number(dataDashboard.totalIncome) - Number(dataDashboard.totalExpense)

    if (isLoading) return <Loader />

    return (
        <body>
            <Header />
            <main className="flex flex-col md:flex-row gap-4 bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className="w-full md:w-2/3 lg:w-3/4">
                    <section className="p-8 bg-primary flex flex-col gap-3 md:flex-row justify-between items-center w-full rounded-xl shadow-lg">
                        <div className="flex flex-col justify-between gap-2 md:gap-4 h-full">
                            <p className="text-[#e0e0e0] text-lg text-center md:text-left">Balance</p>
                            <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">{`Rp${balance.toLocaleString()}`}</p>
                            <p className="text-[#dfdcdc] text-sm font-medium text-center md:text-left">{phoneNumber ? `+62 ${phoneNumber}` : '-'} </p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-4">
                            <div className="bg-white/20 hover:bg-inherit cursor-pointer flex justify-center items-center gap-3 py-2 md:py-4 px-4 md:px-7 border border-solid border-white rounded-xl" onClick={() => router.push('/transfer')}>
                                <Image src={upIcon} alt="transfer" />
                                <p className="text-white text-base md:text-lg font-medium md:font-bold">Transfer</p>
                            </div>
                            <div className="bg-white/20 hover:bg-inherit cursor-pointer flex justify-center items-center gap-3 py-2 md:py-4 px-4 md:px-7 border border-solid border-white rounded-xl" onClick={() => setShowTopup(true)}>
                                <Image src={plusIcon} alt="topup" />
                                <p className="text-white text-base md:text-lg font-medium md:font-bold">Top Up</p>
                            </div>
                        </div>
                        {!dataDashboard && <Loader />}
                    </section>
                    <section className="mt-5 flex gap-5 flex-col lg:flex-row">
                        <section className="bg-white p-8 rounded-xl w-full lg:w-1/2 shadow-lg">
                            <div className="flex justify-between items-center pb-7 md:pb-14">
                                <div>
                                    <Image src={arrowIncome} alt="income" />
                                    <p className="text-[#6a6a6a] text-sm py-2">Income</p>
                                    <p className="text-dark font-bold">{`Rp${dataDashboard.totalIncome?.toLocaleString()}`}</p>
                                </div>
                                <div>
                                    <Image src={arrowExpense} alt="expense" />
                                    <p className="text-[#6a6a6a] text-sm py-2">Expense</p>
                                    <p className="text-dark font-bold">{`Rp${dataDashboard.totalExpense?.toLocaleString()}`}</p>
                                </div>
                            </div>
                            <div className="flex justify-between pb-6">
                                {chart.map((data, i) => {
                                    let height = Math.floor((data.balance / maxValue) * 223)
                                    let hValue = `${height}px`
                                    return (
                                        <div className="flex flex-col-reverse items-center justify-start gap-4 h-[259px]" key={i}>
                                            <div className={`w-3 bg-primary rounded-md relative`} style={{ height: `${hValue}` }} >
                                                <p className="text-[#8F8F8F] text-sm absolute -bottom-6 left-1/2 -translate-x-1/2">{data.day.slice(0, 3)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {!dataDashboard && <Loader />}
                            </div>
                        </section>
                        <section className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg cursor-pointer" onClick={() => router.push('/dashboard/history?page=1&filter=WEEK')}>
                            <p className="text-dark text-lg font-bold pb-10">Transaction History</p>
                            <div className="flex flex-col justify-center items-center gap-6 md:gap-10">
                                {dataHistory.map((data, i) => {
                                    return (
                                        <div className="flex justify-between items-center w-full text-sm lg:text-base" key={i}>
                                            <div className="flex gap-4 items-center">
                                                <div className="w-10 xl:w-14 h-10 xl:h-14 overflow-hidden rounded-lg relative">
                                                    <Image src={`${process.env.NEXT_PUBLIC_AVATAR}${data.image}`} alt="avatar" className="object-cover" fill />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#4D4B57] pb-2">{data.fullName}</p>
                                                    <p className="text-[#7A7886] text-sm">{data.type === 'send' ? 'Transfer' : data.type === 'accept' ? 'Accept' : data.type === 'topup' && 'Topup'}</p>
                                                </div>
                                            </div>

                                            <p className={`${data.type === 'accept' ? 'block ' : 'hidden'} ${data.status === 'pending' ? 'text-dark/50' : 'text-[#1ec15f]'} font-bold`}>+Rp{data.amount.toLocaleString()}</p>
                                            <p className={`${data.type === 'topup' ? 'block ' : 'hidden'} ${data.status === 'pending' ? 'text-dark/50' : 'text-[#1ec15f]'} font-bold`}>+Rp{data.amount.toLocaleString()}</p>
                                            <p className={`${data.type === 'send' ? 'block ' : 'hidden'} ${data.status === 'pending' ? 'text-dark/50' : 'text-error'} font-bold`}>-Rp{data.amount.toLocaleString()}</p>
                                        </div>
                                    )
                                })}

                            </div>
                        </section>
                    </section>

                </section>
            </main>
            <Footer />
            <TopUp show={showTopup} showHandler={topupHandler} />
        </body>
    )
}

export default Dashboard