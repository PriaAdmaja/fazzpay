import '@/styles/globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunitoSans = Nunito_Sans({ 
  weight: '400',
  subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={nunitoSans.className}>
      <Component {...pageProps} />
    </main>
  )
}
