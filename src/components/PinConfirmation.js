import { useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import Loader from "./Loader"
import Toast from "./Toast"
import { transactionStatusAction } from "@/redux/slice/transactionStatus"

const PinConfirmation = ({ show, showHandler }) => {
    const [pin1, setPin1] = useState(null)
    const [pin2, setPin2] = useState(null)
    const [pin3, setPin3] = useState(null)
    const [pin4, setPin4] = useState(null)
    const [pin5, setPin5] = useState(null)
    const [pin6, setPin6] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const { token, id } = useSelector(state => state.userData)
    const body = useSelector(state => state.transferInfo.transferInfo)
    const dispatch = useDispatch()

    const router = useRouter()

    const {receiverId} = useSelector(state => state.transferInfo.transferInfo)

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

    const checkPin = async () => {
        try {
            setIsLoading(true)
            const rawPin = [pin1, pin2, pin3, pin4, pin5, pin6]
            const pin = Number(rawPin.join(''))
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/user/pin/${pin}`
            const result = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (result.data.data.id !== id) {
                setShowToast(true)
                setToastMsg('Wrong PIN!')
                setToastType('danger')
                return
            }
            
            console.log(body);
            const transferUrl = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/transaction/transfer`
            const transactionStatus = await axios.post(transferUrl, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(transactionStatusAction.submitData(transactionStatus.data.data))
            router.push(`/transfer/${receiverId}/status`)

        } catch (error) {
            setShowToast(true)
            setToastMsg(error.response?.data?.msg)
            setToastType('danger')
        } finally {
            setPin1('')
            setPin2('')
            setPin3('')
            setPin4('')
            setPin5('')
            setPin6('')
            setIsLoading(false)
        }
    }

    return (
        <section className={`${show ? 'flex' : 'hidden'} fixed bg-black/10 h-screen w-full left-0 top-0 z-50 justify-center items-center`}>
            <div className="bg-white rounded-2xl p-9 w-[90%] md:w-2/3 lg:w-1/2 relative ">
                <p className="text-dark text-lg font-bold pb-5">Enter PIN to Transfer</p>
                <p className="text-dark/60">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                <div className="flex justify-center items-center gap-3 md:gap-6 py-14">
                    <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin1 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                        <input type="text" name="pin1" maxLength={1} value={pin1} className={`w-3/4 h-3/4 text-center outline-none ${pin1 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                    </div>
                    <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin2 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                        <input type="text" name="pin2" maxLength={1} value={pin2} className={`w-3/4 h-3/4 text-center outline-none ${pin2 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                    </div>
                    <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin3 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                        <input type="text" name="pin3" maxLength={1} value={pin3} className={`w-3/4 h-3/4 text-center outline-none ${pin3 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                    </div>
                    <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin4 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                        <input type="text" name="pin4" maxLength={1} value={pin4} className={`w-3/4 h-3/4 text-center outline-none ${pin4 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                    </div>
                    <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin5 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                        <input type="text" name="pin5" maxLength={1} value={pin5} className={`w-3/4 h-3/4 text-center outline-none ${pin5 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                    </div>
                    <div className={`w-10 md:w-12 lg:w-14 h-12 md:h-14 lg:h-16 flex justify-center items-center ${pin6 ? 'border-primary' : 'border-accent'} border border-solid rounded-lg`}>
                        <input type="text" name="pin6" maxLength={1} value={pin6} className={`w-3/4 h-3/4 text-center outline-none ${pin6 ? 'border-none' : 'border-b'}  border-solid border-b-accent text-base md:text-3xl font-bold`} onChange={(e) => pinHandler(e)} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="button" className="bg-primary py-4 px-12 text-white text-lg font-bold rounded-xl hover:bg-primary/75 " onClick={checkPin}>Continue</button>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-900 rounded-lg absolute right-10 top-10" onClick={showHandler}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                <Toast msg={toastMsg} isShow={showToast} toastType={toastType} showHandler={() => setShowToast(false)} />
                {isLoading && <Loader />}
            </div>

        </section>
    )
}

export default PinConfirmation