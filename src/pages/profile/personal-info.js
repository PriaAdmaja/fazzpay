import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const PersonalInfo = () => {
    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className="p-8 rounded-xl bg-white w-3/4 shadow-xl">
                    <h1 className="font-bold text-lg pb-6 text-dark">Personal Information</h1>
                    <p className="pb-10 text-[#7a7886] w-1/2">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
                    <div className="flex flex-col gap-5 text-[#7a7886]">
                        <div className="p-4 shadow-lg">
                            <p>First Name</p>
                            <p className="font-bold text-xl text-[#514f5b]">Pria</p>
                        </div>
                        <div className="p-4 shadow-lg">
                            <p>Last Name</p>
                            <p className="font-bold text-xl text-[#514f5b]">Admaja</p>
                        </div>
                        <div className="p-4 shadow-lg">
                            <p>Verified E-mail</p>
                            <p className="font-bold text-xl text-[#514f5b]">priaadmaja@gmail.com</p>
                        </div>
                        <div className="p-4 shadow-lg flex justify-between items-center">
                            <div>
                                <p>Phone Number</p>
                                <p className="font-bold text-xl text-[#514f5b]">08123456789</p>
                            </div>
                            <button type="button" className="text-primary">Manage</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default PersonalInfo