import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const PersonalInfo = () => {
    const profile = useSelector(state => state.profile.profile)
    const router = useRouter()
    return (
        <>
            <Header />
            <main className="flex gap-4 flex-col md:flex-row  bg-bgPrimary px-[5%] lg:px-[100px] xl:px-[150px] py-5 md:py-10">
                <Sidebar />
                <section className="p-8 rounded-xl bg-white w-full md:w-3/4 shadow-xl">
                    <h1 className="font-bold text-lg pb-4 sm:pb-6 text-dark">Personal Information</h1>
                    <p className="pb-5 md:pb-10 text-[#7a7886] w-full md:w-2/3 lg:w-1/2">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
                    <div className="flex flex-col gap-5 text-[#7a7886]">
                        <div className="p-4 shadow-lg">
                            <p>First Name</p>
                            <p className="font-bold text-lg md:text-xl text-[#514f5b]">{profile.firstName}</p>
                        </div>
                        <div className="p-4 shadow-lg">
                            <p>Last Name</p>
                            <p className="font-bold text-lg md:text-xl text-[#514f5b]">{profile.lastName}</p>
                        </div>
                        <div className="p-4 shadow-lg">
                            <p>Verified E-mail</p>
                            <p className="font-bold text-lg md:text-xl text-[#514f5b]">{profile.email}</p>
                        </div>
                        <div className="p-4 shadow-lg flex justify-between items-center">
                            <div>
                                <p>Phone Number</p>
                                <p className="font-bold text-lg md:text-xl text-[#514f5b]">{profile.noTelp || '-'}</p>
                            </div>
                            <button type="button" className="text-primary" onClick={() => router.push('/profile/personal-info/phone-number')}>Manage</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default PersonalInfo