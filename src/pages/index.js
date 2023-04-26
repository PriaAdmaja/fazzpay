import Image from 'next/image'
import { useRouter } from 'next/router'

import bgLanding from "../assets/background/landpagebg.svg"
import sample from '../../public/sample2.webp'
import sample1 from "../../public/sample1.webp"
import dropbox from "../assets/logo/dropbox.svg"
import microsoft from "../assets/logo/microsoft.svg"
import airbnb from "../assets/logo/airbnb.svg"
import hnm from "../assets/logo/h&m.svg"
import phone from "../assets/icons/phone-filled.svg"
import lock from "../assets/icons/lock-filled.svg"
import download from "../assets/icons/download.svg"
import avatarSample from "../assets/avatars/1.png"

import arrowLeft from "../assets/icons/arrow-left.svg"

export default function Home() {
  const router = useRouter()
  return (
    <main className='bg-[#FAFCFF]'>
      <header className='bg-primary relative overflow-hidden'>
        <Image src={bgLanding} alt='background' className='absolute top-10 ' />
        <section className='px-[150px]'>
          <nav className='flex  py-16 items-center'>
            <p className='text-white font-bold mr-auto text-3xl'>FazzPay</p>
            <div className='flex gap-7 z-50'>
              <button type='button' className='py-4 px-9 text-white border border-white border-solid rounded-xl cursor-pointer text-lg font-semibold' onClick={() => router.push('/auth/login')}>Login</button>
              <button type='button' className='py-4 px-9 text-primary bg-white rounded-xl cursor-pointer text-lg font-semibold' onClick={() => router.push('/auth/register')}>Sign Up</button>
            </div>
          </nav>
          <section className='relative overflow-hidden'>
            <div className='w-1/2 flex flex-col gap-10 pb-[254px]'>
              <h1 className='font-bold text-6xl text-white'>Awesome App
                For Saving Time.</h1>
              <p className='text-lg text-white'>We bring you a mobile app for banking problems that
                oftenly wasting much of your times.</p>
              <button type='button' className='py-4 px-11 bg-white rounded-xl text-lg font-semibold text-primary w-1/3'>Try It Free</button>
            </div>
            <Image src={sample} alt='sample' className='w-1/2 absolute right-0 -top-20 ' />
          </section>
        </section>
      </header>
      <section className='bg-[rgba(71,58,209,.06)] flex justify-between items-center px-[150px] py-24'>
        <Image src={microsoft} alt='microsoft' />
        <Image src={dropbox} alt='dropbox' />
        <Image src={hnm} alt='H&M' />
        <Image src={airbnb} alt='airbnb' />
      </section>
      <section className='px-[150px] py-[120px]'>
        <h2 className='font-bold text-6xl text-dark text-center'><span className='text-primary'>About</span> the Application.</h2>
        <p className='text-lg w-1/2 text-center mx-auto pt-8'>We have some great features from the application and it’s totally free to use by all users around the world.</p>
        <div className='flex justify-center items-center gap-5 pt-16'>
          <div className='w-1/3 px-7 py-10 flex flex-col justify-center items-center gap-9 bg-white rounded-xl shadow-xl'>
            <div className='rounded-full w-16 h-16 flex justify-center items-center mx-auto bg-primary/10'>
              <Image src={phone} alt='phone' />
            </div>
            <p className='text-2xl font-semibold text-dark text-center'>24/7 Support</p>
            <p className='text-lg text-center text-dark/90'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
          </div>
          <div className='w-1/3 px-7 py-10 flex flex-col justify-center items-center gap-9 bg-white rounded-xl shadow-xl'>
            <div className='rounded-full w-16 h-16 flex justify-center items-center mx-auto bg-primary/10'>
              <Image src={lock} alt='safety' />
            </div>
            <p className='text-2xl font-semibold text-dark text-center'>Data Privacy</p>
            <p className='text-lg text-center text-dark/90'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
          </div>
          <div className='w-1/3 px-7 py-10 flex flex-col justify-center items-center gap-9 bg-white rounded-xl shadow-xl'>
            <div className='rounded-full w-16 h-16 flex justify-center items-center mx-auto bg-primary/10'>
              <Image src={download} alt='phone' />
            </div>
            <p className='text-2xl font-semibold text-dark text-center'>Easy Download</p>
            <p className='text-lg text-center text-dark/90'>Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.</p>
          </div>
        </div>
      </section>
      <section className='bg-primary/5 px-[150px] flex justify-center items-center overflow-hidden'>
        <div className='relative w-2/5 flex-1'>
          <div className='flex flex-col absolute'>
            <Image src={sample1} alt='chart' className='w-full ' />
            <Image src={sample1} alt='chart' className='w-full ' />
          </div>
        </div>
        <div className='flex-1 py-[174px]'>
          <h2 className='font-bold text-6xl text-dark text-left pb-10'>All The <span className='text-primary'>Great</span> Fazzpay Features</h2>
          <div className='flex flex-col gap-7 justify-center items-center'>
            <div className='p-6 rounded-xl bg-white shadow-md w-full'>
              <div className='flex justify-start items-center font-bold gap-4 pb-4'>
                <p className='text-primary text-xl'>1.</p>
                <p className='text-dark text-xl'>Small Fee</p>
              </div>
              <p className='text-lg text-dark'>We only charge 5% of every success transaction done in FazzPay app.</p>
            </div>
            <div className='p-6 rounded-xl bg-white shadow-md w-full'>
              <div className='flex justify-start items-center font-bold gap-4 pb-4'>
                <p className='text-primary text-xl'>2.</p>
                <p className='text-dark text-xl'>Data Secured</p>
              </div>
              <p className='text-lg text-dark'>All your data is secured properly in our system and it’s encrypted.</p>
            </div>
            <div className='p-6 rounded-xl bg-white shadow-md w-full'>
              <div className='flex justify-start items-center font-bold gap-4 pb-4'>
                <p className='text-primary text-xl'>3.</p>
                <p className='text-dark text-xl'>User Friendly</p>
              </div>
              <p className='text-lg text-dark'>FazzPay come up with modern and sleek design and not complicated.</p>
            </div>
          </div>
        </div>

      </section>
      <section className='py-[120px] px-[150px]'>
        <h2 className='font-bold text-6xl text-dark text-center'>What Users are <span className='text-primary'>Saying.</span></h2>
        <p className='text-lg w-1/2 text-center mx-auto pt-8'>We have some great features from the application and it’s totally free to use by all users around the world.</p>
        <section className='w-full pt-[60px] relative'>
          <div className='w-4/5 p-14 mx-auto bg-white shadow-xl'>
            <div className='overflow-hidden rounded-xl w-[120px] h-[120px] mx-auto'>
              <Image src={avatarSample} alt='avatar' className='object-cover' />
            </div>
            <p className='text-center pt-8 pb-2'>Alex Hansinburg</p>
            <p className='text-center'>Designer</p>
            <p className='text-center pt-14'>“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”</p>
          </div>
          <div className='flex justify-between w-full items-center absolute top-1/2'>
            <div className='w-[60px] h-[60px] flex justify-center items-center bg-white rounded-xl shadow-md cursor-pointer'>
              <Image src={arrowLeft} alt='arrow' className='rotate-180' />
            </div>
            <div className='w-[60px] h-[60px] flex justify-center items-center bg-white rounded-xl shadow-md cursor-pointer'>
              <Image src={arrowLeft} alt='arrow' />
            </div>
          </div>
        </section>
      </section>
      <footer className='bg-primary py-20 px-[150px]'>
        <section className='w-1/3'>
          <p className='text-4xl text-white font-semibold'>FazzPay</p>
          <p className='text-lg text-white pt-8 pb-12'>Simplify financial needs and saving much time in banking needs with one single app.</p>
        </section>
        <div className='w-full border-t border-solid border-white flex justify-center items-center pt-7'>
          <p className='text-white mr-auto relative'>2020 FazzPay. All right reserved.</p>
          <p className='text-white font-medium'>082228316811</p>
          <p className='text-white font-medium pl-10'>contact@fazzpay.com</p>

        </div>
      </footer>
    </main>

  )
}
