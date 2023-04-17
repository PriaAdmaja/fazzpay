import '@/styles/globals.css'
import localFont from 'next/font/local'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from '@/redux/store'

const myFont = localFont({ src: '../assets/fonts/NunitoSans-Regular.ttf' })

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  )
}
