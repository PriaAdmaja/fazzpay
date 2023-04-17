import { useState } from "react"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const ChangePin = () => {
    const [pin1, setPin1] = useState(null)
    const [pin2, setPin2] = useState(null)
    const [pin3, setPin3] = useState(null)
    const [pin4, setPin4] = useState(null)
    const [pin5, setPin5] = useState(null)
    const [pin6, setPin6] = useState(null)
    const [currentPin, setCurrentPin] = useState(false)

    const pinHandler = (e) => {
        switch (e.target.name) {
            case 'pin1': setPin1(e.target.value);
                break;
            case 'pin2': setPin2(e.target.value);
                break;
            case 'pin3': setPin3(e.target.value);
                break;
            case 'pin4': setPin4(e.target.value);
                break;
            case 'pin5': setPin5(e.target.value);
                break;
            case 'pin6': setPin6(e.target.value);
                break;
        }
    }

    const sendCurrentPin = () => {
        setCurrentPin(true)
        setPin1(null)
        setPin2(null)
        setPin3(null)
        setPin4(null)
        setPin5(null)
        setPin6(null)
    }

    return (
        <>
            <Header />
            <main className="flex gap-4 bg-bgPrimary px-[150px] py-10">
                <Sidebar />
                <section className={`p-8 rounded-xl bg-white w-3/4 shadow-xl ${currentPin === true ? 'hidden' : 'block'}`}>
                    <h1 className="font-bold text-lg pb-6 text-dark">Change PIN</h1>
                    <p className="pb-10 text-[#7a7886] w-1/2">Enter your current 6 digits Fazzpay PIN below to continue to the next steps.</p>
                    <div className="w-1/2 mx-auto pb-[200px]">
                        <div className="flex justify-center items-center gap-3 ">
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin1 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin1" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin1 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin2 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin2" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin2 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin3 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin3" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin3 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin4 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin4" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin4 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin5 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin5" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin5 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin6 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin6" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin6 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                        </div>
                        <div className="pt-[90px]">
                            <button type="button" className={`${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} onClick={sendCurrentPin} >Continue</button>
                            <div className={`${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Continue</div>
                        </div>
                    </div>
                </section>
                <section className={`p-8 rounded-xl bg-white w-3/4 shadow-xl ${currentPin === true ? 'block' : 'hidden'}`}>
                    <h1 className="font-bold text-lg pb-6 text-dark">Change PIN</h1>
                    <p className="pb-10 text-[#7a7886] w-1/2">Type your new 6 digits security PIN to use in Fazzpay.</p>
                    <div className="w-1/2 mx-auto pb-[200px]">
                        <div className="flex justify-center items-center gap-3 ">
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin1 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin1" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin1 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin2 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin2" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin2 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin3 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin3" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin3 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin4 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin4" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin4 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin5 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin5" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin5 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                            <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin6 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                                <input type="text" name="pin6" maxLength={1} className={`w-3/4 h-3/4 text-center outline-none ${pin6 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                            </div>
                        </div>
                        <div className="pt-[90px]">
                            <button type="button" className={`${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} >Change PIN</button>
                            <div className={`${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Change PIN</div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ChangePin