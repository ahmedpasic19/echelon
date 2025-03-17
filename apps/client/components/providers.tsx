'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { store } from '@/lib/_features/store'

type TProps = {
   children: ReactNode
}

const Providers = ({ children }: TProps) => {
   return (
      <SessionProvider>
         <Provider store={store}>
            <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
               {children}
            </ThemeProvider>
         </Provider>
         <Toaster />
      </SessionProvider>
   )
}

export default Providers
