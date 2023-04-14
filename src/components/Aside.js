import Image from "next/image"

import bgWave from "../../public/Vector 4.svg"
import bgWave2 from "../../public/Vector 3.svg"
import sample1 from "../../public/sample1.webp"
import sample2 from "../../public/sample2.webp"

const Aside = () => {
    return (
        <section className="bg-primary relative flex-1 hidden md:block">
            <Image src={bgWave} alt="background" className="absolute top-12"/>
            <Image src={bgWave2} alt="background" className="absolute top-12"/>
            <div className="py-[5%] px-[10%] ">
                <p className="text-white text-3xl font-bold">FazzPay</p>
                <div className="flex justify-center items-center ">
                    <Image src={sample1} alt="sample" className="w-[230px] lg:w-[278px] h-auto -rotate-6 relative left-12" />
                    <Image src={sample2} alt="sample" className="w-[230px] lg:w-[278px] h-auto rotate-6 relative right-12" />
                </div>
                <p className="text-white text-xl lg:text-2xl font-bold pb-7">App that Covering Banking Needs.</p>
                <p className="text-white opacity-80">FazzPay is an application that focussing in banking needs for all users
                    in the world. Always updated and always following world trends.
                    5000+ users registered in FazzPay everyday with worldwide
                    users coverage.</p>
            </div>
        </section>
    )
}

export default Aside