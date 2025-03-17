'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import React from 'react'

import { useTheme } from 'next-themes'

export const ThemeBtn = () => {
   const { resolvedTheme, setTheme } = useTheme()

   const isDarkMode = resolvedTheme === 'dark'

   const toggleTheme = () => {
      if (isDarkMode) setTheme('light')
      if (!isDarkMode) setTheme('dark')
   }

   return (
      <button onClick={toggleTheme}>
         {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="h-6 w-6" />}
      </button>
   )
}
