import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import './globals.css'
import Providers from '@/components/providers'

type TProps = {
   children: React.ReactNode
   modal: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'NextJS Enterprise',
   description: 'NextJS ERP System',
}

export default function RootLayout(props: TProps) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <Providers>
               <main>
                  {props.children}
                  {props.modal}
               </main>
            </Providers>
         </body>
      </html>
   )
}
