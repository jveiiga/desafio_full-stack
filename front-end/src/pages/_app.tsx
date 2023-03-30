import AuthProvider from '@/context/authContext'
import ContactProvider from '@/context/contactContext'
import RegisterProvider from '@/context/userContext'
import '@/styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from 'next/app'


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RegisterProvider>
          <ContactProvider>
            <Component {...pageProps} />
          </ContactProvider>
        </RegisterProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
