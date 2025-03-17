import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'

type TProps = {
   children: React.ReactNode
   modal: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Offers | NextJS Enterprise',
   description: 'Offers | NextJS ERP System',
}

export default function WorkspaceLayout(props: TProps) {
   return (
      <div className={inter.className}>
         <Navbar />
         <div className="w-full flex justify-center items-center">
            <div className="flex flex-col w-[90%]">
               <div className="h-10"></div>
               <div className="grid grid-cols-[minmax(20%,3rem)_auto]">
                  <Sidebar />
                  <main className="p-5 border-1 border-gray-100 dark:border-gray-800 rounded-2xl">
                     {props.children}
                  </main>
               </div>
            </div>
         </div>
      </div>
   )
}
