import Image from "next/image"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

import searchIcon from "../../assets/icons/search.svg"
import defaultAvatar from "../../assets/avatars/default-avatar.jpg"
import Loader from "@/components/Loader"
import authCheck from "@/utils/AuthCheck"

const Transfer = () => {
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchData, setSearchData] = useState(null)
    const { token } = useSelector(state => state.userData)


    const router = useRouter()

    if (!router.query.page) {
        router.push('/transfer?page=1')
    }

    useEffect(() => {
        let getData = true
        let time = 0
        if (router.query.search) {
            time = 1000
        }
        const searching = setTimeout(() => {
            if (getData === true) {
                setIsLoading(true)
                const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user?page=${router.query.page}&limit=5${!router.query.search ? '' : `&search=${router.query.search}`}&sort=firstName ASC`
                axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => setUserList(res.data)).catch(err => console.log(err)).finally(() => setIsLoading(false))
            }
            return () => { getData = false }
        }, time)
        return () => clearTimeout(searching)
    }, [router])

    const searchHandler = (data) => {
        setSearchData(data)
        router.push(`/transfer?page=${router.query.page}${!data ? '' : `&search=${data}`}`)
    }

    const nextPage = () => {
        const page = userList.pagination?.page + 1
        router.push(`/transfer?page=${page}`)
    }

    const prevPage = () => {
        const page = userList.pagination?.page - 1
        router.push(`/transfer?page=${page}`)
    }

    return (
        <>
            <Header />
            <main className="flex flex-col md:flex-row  gap-4 bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className=" rounded-xl bg-white w-full md:w-2/3 lg:w-3/4 p-8 shadow-xl min-h-[670px] md:min-h-[778px] relative">
                    <p className="font-bold text-lg text-dark">Search Receiver</p>
                    <div className="p-4 bg-dark/10 rounded-xl flex gap-4 justify-start mt-6">
                        <Image src={searchIcon} alt="search" />
                        <input type="text" placeholder="Search receiver here" className="w-full bg-inherit " onChange={(e) => searchHandler(e.target.value)} />
                    </div>
                    <div className="mt-8 flex flex-col gap-4 md:gap-5">
                        {userList.data?.map(data => {
                            return (
                                <div className="flex justify-start items-center gap-5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-3 md:p-5 rounded-xl" key={data.id} onClick={() => router.push(`/transfer/${data.id}`)}>
                                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-md overflow-hidden relative">
                                        <Image src={data.image ? `${process.env.NEXT_PUBLIC_AVATAR}${data.image}` : defaultAvatar} alt="avatar" className="object-cover" fill />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <p className="font-normal md:font-bold text-base md:text-lg text-dark text-center">{data.firstName} {data.lastName}</p>
                                        <p className="text-sm text-dark opacity-90 text-center">{data.noTelp ? `${data.noTelp}` : '-'}</p>
                                    </div>
                                </div>
                            )
                        })}
                        {isLoading && <Loader />}
                    </div>
                    <div className="absolute bottom-5 flex justify-center items-center gap-2 left-1/2 -translate-x-1/2 w-full">
                        <button type="button" className={`${userList.pagination?.page === 1 ? 'invisible' : 'visible'} py-1 px-3 font-medium rounded-lg bg-primary text-white`} onClick={prevPage}>&#60; prev</button>
                        <p className="py-1 px-3  rounded-lg bg-primary font-medium text-white">Page {userList.pagination?.page} of {userList.pagination?.totalPage} </p>
                        <button type="button" className={`${userList.pagination?.page === userList.pagination?.totalPage ? 'invisible' : 'visible'} py-1 px-3 font-medium rounded-lg bg-primary text-white`} onClick={nextPage}>next &#62;</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default authCheck( Transfer)