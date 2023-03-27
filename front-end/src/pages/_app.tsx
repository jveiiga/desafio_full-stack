import AuthProvider from '@/context/authContext'
import RegisterProvider from '@/context/registerContext'
import '@/styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from 'next/app'


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RegisterProvider>
          <Component {...pageProps} />
        </RegisterProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
