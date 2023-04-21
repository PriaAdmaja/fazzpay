import Image from "next/image"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Footer from "@/components/Footer"

import upIcon from "../../assets/icons/arrow-up-accent.svg"
import plusIcon from "../../assets/icons/plus-accent.svg"
import arrowIncome from "../../assets/icons/arrow-income.svg"
import arrowExpense from "../../assets/icons/arrow-expense.svg"
import avatarExmp from "../../assets/avatars/1.png"
import { profileAction } from "@/redux/slice/profile"
import Loader from "@/components/Loader"

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataDashboard, setDataDashboard] = useState({})
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
        }
        return () => { getData = false }
    }, [id])

    const { listIncome, listExpense } = dataDashboard

    let total = 0
    const chart = []
    listIncome?.map((data, i) => {
        total += data.total
        total -= listExpense[i].total
        chart.push({ "day": data.day, "balance": total })
    })
    const maxValue = [...chart].sort((a, b) => b.balance - a.balance)[0]?.balance

    if (isLoading) return <Loader />

    return (
        <body>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className="w-3/4">
                    <section className="p-8 bg-primary flex justify-between items-center w-full rounded-xl shadow-lg">
                        <div className="flex flex-col justify-between gap-4 h-full">
                            <p className="text-[#e0e0e0] text-lg">Balance</p>
                            <p className="text-white text-4xl font-bold">{`Rp${Number(dataDashboard.totalIncome) - Number(dataDashboard.totalExpense)}`}</p>
                            <p className="text-[#dfdcdc] text-sm font-medium">{phoneNumber ? `+62 ${phoneNumber}` : '-'} </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="bg-white/20 hover:bg-inherit cursor-pointer flex justify-center items-center gap-3 py-4 px-7 border border-solid border-white rounded-xl">
                                <Image src={upIcon} alt="transfer" />
                                <p className="text-white text-lg font-bold">Transfer</p>
                            </div>
                            <div className="bg-white/20 hover:bg-inherit cursor-pointer flex justify-center items-center gap-3 py-4 px-7 border border-solid border-white rounded-xl">
                                <Image src={plusIcon} alt="transfer" />
                                <p className="text-white text-lg font-bold">Top Up</p>
                            </div>
                        </div>


                    </section>
                    <section className="mt-5 flex gap-5">
                        <section className="bg-white p-8 rounded-xl w-1/2 shadow-lg">
                            <div className="flex justify-between items-center pb-14">
                                <div>
                                    <Image src={arrowIncome} alt="income" />
                                    <p className="text-[#6a6a6a] text-sm py-2">Income</p>
                                    <p className="text-dark font-bold">{`Rp${dataDashboard.totalIncome}`}</p>
                                </div>
                                <div>
                                    <Image src={arrowExpense} alt="expense" />
                                    <p className="text-[#6a6a6a] text-sm py-2">Expense</p>
                                    <p className="text-dark font-bold">{`Rp${dataDashboard.totalExpense}`}</p>
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
                            </div>
                        </section>
                        <section className="w-2/4 bg-white p-8 rounded-xl shadow-lg">
                            <p className="text-dark text-lg font-bold pb-10">Transaction History</p>
                            <div>
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
                    </section>

                </section>
            </main>
            <Footer />
        </body>
    )
}

export default Dashboard