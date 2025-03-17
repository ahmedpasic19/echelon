import React from 'react'

import AuthBtns from './auth-btn'
import { ThemeBtn } from './theme-btn'

const Navbar = () => {
   return (
      <nav className="bg-white dark:bg-dark border-b-1 border-gray-100 dark:border-gray-800 p-2 flex items-center justify-center gap-4">
         <div className="flex justify-end w-[90%]">
            <ThemeBtn />
            <AuthBtns />
         </div>
      </nav>
   )
}

export default Navbar
