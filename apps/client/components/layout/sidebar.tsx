'use client'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
   const pages = [
      {
         title: 'Home',
         href: '/',
      },
      {
         title: 'Companies',
         href: '/companies',
      },
      {
         title: 'Users',
         href: '/users',
      },
      {
         title: 'Articles',
         href: '/articles',
      },
      {
         title: 'Storages',
         href: '/storages',
      },
      {
         title: 'Clients',
         href: '/clients',
      },
      {
         title: 'Offers',
         href: '/offers',
      },
   ]

   const pathname = usePathname()

   return (
      <div className="bg-white dark:bg-dark p-4">
         <h3 className="uppercase text-lg font-extrabold tracking-tighter w-full text-center max-w-sm">
            ERP
         </h3>
         <ul className="flex flex-col w-full gap-4">
            {pages.map((page) => (
               <Link
                  key={Math.random()}
                  href={page.href}
                  className={`underline-offset-2 ${
                     pathname === page.href ? 'underline' : 'hover:underline'
                  }`}
               >
                  {page.title}
               </Link>
            ))}
         </ul>
      </div>
   )
}

export default Sidebar
