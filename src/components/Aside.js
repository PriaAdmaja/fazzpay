import Image from "next/image"
import bgWave from "../../public/Vector 4.svg"
import sample1 from "../../public/sample1.webp"
import sample2 from "../../public/sample2.webp"

const Aside = () => {
    return (
        <section className="bg-primary relative flex-1 ">
            <Image src={bgWave} alt="background" className="absolute top-10"/>
            <div className="px-[10%] py-[5%]">
                <p className="text-white text-3xl font-bold">FazzPay</p>
                <div className="flex justify-center items-center ">
                    <Image src={sample1} alt="sample" className="w-[278px] h-auto -rotate-6 relative left-12" />
                    <Image src={sample2} alt="sample" className="w-[278px] h-auto rotate-6 relative right-12" />
                </div>
                <p className="text-white text-2xl font-bold pb-7">App that Covering Banking Needs.</p>
                <p className="text-white opacity-80">FazzPay is an application that focussing in banking needs for all users
                    in the world. Always updated and always following world trends.
                    5000+ users registered in FazzPay everyday with worldwide
                    users coverage.</p>
            </div>
        </section>
    )
}

export default Aside