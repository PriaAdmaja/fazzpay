import { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Loader from "./Loader"
import { useRouter } from "next/router"
import Toast from "./Toast"

const TopUp = ({ show, showHandler }) => {
    const [amount, setAmount] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    //toast
    const [toastMsg, setToastMsg] = useState(null)
    const [toastType, setToastType] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const { token } = useSelector(state => state.userData)

    const router = useRouter()

    const sendTopup = async () => {

        try {
            setIsLoading(true)
            const url = `${process.env.NEXT_PUBLIC_FAZZPAY_API}/transaction/top-up`
            const result = await axios.post(url, { amount }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            router.replace(result.data.data.redirectUrl)

        } catch (error) {
            setShowToast(true)
            setToastMsg(error.response.data.msg)
            setToastType('danger')

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section className={`${show ? 'flex' : 'hidden'} fixed bg-black/10 h-screen w-full left-0 top-0 z-50 justify-center items-center`}>
            <div className="bg-white rounded-2xl p-9 w-[90%] sm:w-3/4 md:w-1/2 relative ">
                <p className="text-dark text-lg font-bold pb-5">Topup</p>
                <p className="text-dark/60">Enter the amount of money, and click submit</p>
                <div className="w-full p-3 mt-6 md:mt-11  mb-10 md:mb-16 border border-solid border-[rgba(169,169,169,0.6)] rounded-xl flex justify-center items-center">
                    <input type="number" className="text-center outline-none border-b border-solid border-[rgba(169,169,169, .4)] w-3/5 text-dark font-bold text-lg" onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="flex justify-end">
                    <button type="button" className="bg-primary py-4 px-12 text-white text-lg font-bold rounded-xl hover:bg-primary/75 " onClick={sendTopup}>Submit</button>
                </div>
                <button type="button" className="text-gray-400 hover:text-gray-900 rounded-lg absolute right-10 top-10" onClick={showHandler}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <Toast msg={toastMsg} isShow={showToast} toastType={toastType} showHandler={() => setShowToast(false)} />
            {isLoading && <Loader />}

        </section>
    )
}

export default TopUp