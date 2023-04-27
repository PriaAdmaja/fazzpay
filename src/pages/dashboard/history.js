import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Loader from "@/components/Loader"

import authCheck from "@/utils/AuthCheck"
import Head from "next/head"

const History = () => {
    const [buttonText, setButtonText] = useState('-- Select Filter --')
    const [showFilter, setShowFilter] = useState(false)
    const [dataHistory, setDataHistory] = useState([])
    const [filter, setFilter] = useState('WEEK')
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter()
    if (!router.query.page) {
        router.push('/dashboard/history?page=1&filter=WEEK')
    }

    const token = useSelector(state => state.userData.token)

    useEffect(() => {
        let getData = true
        if (getData) {
            setIsLoading(true)
            const urlHistory = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/transaction/history?page=${router.query.page}&limit=5&filter=${router.query.filter}`
            axios.get(urlHistory, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setDataHistory(res.data)).catch(err => console.log(err)).finally(() => setIsLoading(false))
        }
        return () => { getData = false }

    }, [router])

    const selectFilter = (filters) => {
        setButtonText(filters)
        switch (filters) {
            case '-- Week --':
                setFilter('WEEK')
                router.push(`/dashboard/history?page=${dataHistory.pagination?.page}&filter=WEEK`)
                break;
            case '-- Month --':
                setFilter('MONTH')
                router.push(`/dashboard/history?page=${dataHistory.pagination?.page}&filter=MONTH`)
                break;
            case '-- Year --':
                setFilter('YEAR')
                router.push(`/dashboard/history?page=${dataHistory.pagination?.page}&filter=YEAR`)
                break;
        }
        setShowFilter(false)
    }

    const nextPage = () => {
        const page = dataHistory.pagination?.page + 1
        router.push(`/dashboard/history?page=${page}&filter=${filter}`)
    }

    const prevPage = () => {
        const page = dataHistory.pagination?.page - 1
        router.push(`/dashboard/history?page=${page}&filter=${filter}`)
    }

    return (
        <>
            <Head>
                <title>FazzPay || History</title>
            </Head>
            <Header />
            <main className="flex flex-col md:flex-row gap-4 bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className="flex flex-col justify-start items-center rounded-xl bg-white w-full md:w-3/4 p-8 shadow-xl min-h-[550px] md:min-h-[650px] relative">
                    <div className="flex justify-between items-start w-full pb-9">
                        <p className="font-bold text-lg text-dark">Transaction History</p>
                        <div className="relative w-2/5 lg:w-1/3 xl:w-1/4">
                            <button type="button" className=" px-3 md:px-7 py-1 md:py-2 bg-dark/10 text-xs sm:text-sm rounded-lg w-full" onClick={() => showFilter ? setShowFilter(false) : setShowFilter(true)}>{buttonText}</button>
                            <div className={`absolute bg-gray-200 ${showFilter ? 'flex' : 'hidden'} flex-col w-full top-10 rounded-md overflow-hidden`}>
                                <button type="button" className="hover:bg-gray-300 py-1 text-sm" onClick={() => selectFilter('-- Week --')}>Week</button>
                                <button type="button" className="hover:bg-gray-300 py-1 text-sm" onClick={() => selectFilter('-- Month --')}>Month</button>
                                <button type="button" className="hover:bg-gray-300 py-1 text-sm" onClick={() => selectFilter('-- Year --')}>Year</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-5 md:gap-10">
                        {dataHistory.data?.map((data, i) => {
                            return (
                                <div className="flex justify-between items-center w-full" key={i}>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-14 h-14 overflow-hidden rounded-lg relative">
                                            <Image src={`${process.env.NEXT_PUBLIC_AVATAR}${data.image}`} alt="avatar" className="object-cover" fill />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#4D4B57] pb-2">{data.fullName}</p>
                                            <p className="text-[#7A7886] text-sm">{data.type === 'send' ? 'Transfer' : data.type === 'accept' ? 'Accept' : data.type === 'topup' && 'Topup'}</p>
                                        </div>
                                    </div>
                                    <p className={`${data.type === 'accept' ? 'block ' : 'hidden'} ${data.status === 'pending' ? 'text-dark/50' : 'text-[#1ec15f]'} font-bold`}>+Rp{data.amount}</p>
                                    <p className={`${data.type === 'topup' ? 'block ' : 'hidden'} ${data.status === 'pending' ? 'text-dark/50' : 'text-[#1ec15f]'} font-bold`}>+Rp{data.amount}</p>
                                    <p className={`${data.type === 'send' ? 'block ' : 'hidden'} ${data.status === 'pending' ? 'text-dark/50' : 'text-error'} font-bold`}>-Rp{data.amount}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="absolute bottom-5 flex justify-center items-center gap-2">
                        <button type="button" className={`${dataHistory.pagination?.page === 1 ? 'invisible' : 'visible'} py-1 px-3 font-medium rounded-lg bg-primary text-white`} onClick={prevPage}>&#60; prev</button>
                        <p className="py-1 px-3  rounded-lg bg-primary font-medium text-white">Page {dataHistory.pagination?.page} of {dataHistory.pagination?.totalPage} </p>
                        <button type="button" className={`${dataHistory.pagination?.page === dataHistory.pagination?.totalPage ? 'invisible' : 'visible'} py-1 px-3 font-medium rounded-lg bg-primary text-white`} onClick={nextPage}>next &#62;</button>
                    </div>
                    {isLoading && <Loader />}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default authCheck(History)