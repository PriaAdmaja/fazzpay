import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import axios from "axios"
import { forwardRef, useState } from "react"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Loader from "@/components/Loader"

import defaultAvatar from "../../assets/avatars/default-avatar.jpg"
import pen from "../../assets/icons/edit-2.svg"
import rightArrow from "../../assets/icons/arrow-left.svg"
import { userDataAction } from "@/redux/slice/userData"
import { profileAction } from "@/redux/slice/profile"
import Toast from "@/components/Toast"

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [loadingAvatar, setLoadingAvatar] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const { firstName, lastName, noTelp, image } = useSelector(state => state.profile.profile)
    const avatar = `${process.env.NEXT_PUBLIC_AVATAR}${image}`
    const { token, id } = useSelector(state => state.userData)
    const router = useRouter()
    const dispatch = useDispatch()

    const logout = async () => {
        try {
            setIsLoading(true)
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/auth/logout`
            await axios.post(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(userDataAction.clearData())
            dispatch(profileAction.clearData())
            router.push('/auth/login')
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    const updateAvatar = async (e) => {
        try {
            setLoadingAvatar(true)
            const img = e.target.files[0]
            const formData = new FormData()
            formData.append('image', img)
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/image/${id}`
            const result = await axios.patch(url, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (result.data.msg === "Your token is destroyed please login again !") {
                dispatch(userDataAction.clearData())
                dispatch(profileAction.clearData())
                router.push('/auth/login')
                return
            }
            const urlGet = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/profile/${id}`
            const profile = await axios.get(urlGet, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(profileAction.submitProfile(profile.data.data))
        } catch (error) {
            setShowToast(true)
            setToastMsg(error.response.data.msg)
            setToastType('danger')
        } finally {
            setLoadingAvatar(false)
        }
    }

    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className="flex flex-col justify-center items-center rounded-xl bg-white w-3/4 py-12 shadow-xl">
                    <div className="flex flex-col gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden relative">
                            <Image src={image ? avatar : defaultAvatar} alt="avatar" className="object-cover" fill priority /> :
                            {loadingAvatar && <Loader />}
                        </div>
                        <label className="flex justify-center items-center gap-3 cursor-pointer">
                            <Image src={pen} alt="edit" className="w-3 h-3" />
                            <input type="file" className="hidden" onChange={(e) => updateAvatar(e)} />
                            <p className="text-[#7a7886]">Edit</p>
                        </label>
                    </div>
                    <p className="text-2xl font-bold text-dark pt-4 pb-2">{firstName} {lastName}</p>
                    <p className="pb-12">{noTelp}</p>
                    <div className="w-1/2 flex flex-col justify-center items-center gap-5">
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer" onClick={() => router.push('/profile/personal-info')}>
                            <p>Personal Information</p>
                            <Image src={rightArrow} alt="arrow" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer" onClick={() => router.push('/profile/change-password')}>
                            <p>Change Password</p>
                            <Image src={rightArrow} alt="arrow" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer" onClick={() => router.push('/profile/change-pin')}>
                            <p>Change PIN</p>
                            <Image src={rightArrow} alt="arrow" />
                        </div>
                        <div className="flex items-center justify-between w-full bg-[#e5e8ed] py-3 px-4 rounded-xl cursor-pointer" onClick={logout}>
                            <p>Logout</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            {isLoading && <Loader />}
            <Toast msg={toastMsg} isShow={showToast} toastType={toastType} showHandler={() => setShowToast(false)} />
        </>
    )
}

export default Profile