import { useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

import Aside from "@/components/Aside"
import check from "../../assets/icons/check.svg"
import Loader from "@/components/Loader"

const CreatePin = () => {
    const [pin1, setPin1] = useState(null)
    const [pin2, setPin2] = useState(null)
    const [pin3, setPin3] = useState(null)
    const [pin4, setPin4] = useState(null)
    const [pin5, setPin5] = useState(null)
    const [pin6, setPin6] = useState(null)
    const [pinSuccess, setPinSuccess] = useState(false)
    //loader
    const [isLoading, setIsLoading] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const id = useSelector((state) => state.userData.id)
    const token = useSelector((state) => state.userData.token)
    const router = useRouter()

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

    const confirmPin = async () => {
        try {
            setIsLoading(true)
            const rawPin = [pin1, pin2, pin3, pin4, pin5, pin6]
            const pin = Number(rawPin.join(''))
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/pin/${id}`
            console.log(id);
            const result = await axios.patch(url, { pin }, {
                headers: {
                    'Authorization': `Beaer ${token}`
                }
            })
            setToastMsg(result.data.msg)
            setToastType('success')
            setShowToast(true)
            setPinSuccess(true)
        } catch (error) {
            if(error.response.data.msg === "Please login first !") {
                return router.push('/auth/login')
            }
            setToastMsg(error.response.data.msg)
            setToastType('danger')
            setShowToast(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex justify-center items-center">
            <Aside />
            <main className="flex-1 relative bg-primary md:bg-white h-full ">
                <section className={`py-[5%] px-[10%] m-[5%] md:m-0 bg-white rounded-xl ${pinSuccess ? 'hidden' : 'block'} `}>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold pb-5 md:pb-6 lg:pb-8 text-dark">Secure Your Account, Your Wallet,
                        and Your Data With 6 Digits PIN
                        That You Created Yourself.</h1>
                    <p className="text-dark text-sm md:text-base opacity-60 pb-10  lg:pb-16">Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.</p>
                    <div className="flex justify-center items-center gap-3 md:gap-6">
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
                        <button type="button" className={`${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? 'block' : 'hidden'} bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} onClick={confirmPin}>Confirm</button>
                        <div className={`${pin1 && pin2 && pin3 && pin4 && pin5 && pin6 ? 'hidden' : 'block'} bg-disabled text-txtDisabled font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg select-none`}>Confirm</div>
                    </div>
                </section>
                <section className={`py-[5%] px-[10%] m-[5%] md:m-0 bg-white rounded-xl ${pinSuccess ? 'block' : 'hidden'}`}>
                    <div className="rounded-full w-[70px] h-[70px] bg-[#1EC15F] flex justify-center items-center mb-[50px]"><Image src={check} alt="check" /></div>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold pb-5 md:pb-6 lg:pb-8 text-dark">Your PIN Was Successfully Created</h1>
                    <p className="text-dark text-sm md:text-base opacity-60 pb-10  lg:pb-16">Your PIN was successfully created and you can now access all the features in FazzPay.</p>
                    <div className="">
                        <button type="button" className={` bg-primary text-white font-bold text-lg w-full py-3 md:py-4 text-center rounded-lg hover:opacity-80`} onClick={() => router.push('/')}>Go To Dashboard</button>
                    </div>
                </section>
                {isLoading && <Loader />}
            </main>
        </section>
    )
}

export default CreatePin