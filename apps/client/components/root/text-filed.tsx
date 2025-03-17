'use client'

import React from 'react'

import { useFormContext } from 'react-hook-form'

interface TProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string
}

const TextField = ({ label, ...props }: TProps) => {
   const {
      register,
      formState: { errors },
   } = useFormContext()

   return (
      <fieldset className="flex w-full flex-col">
         <label className="font-semibold dark:text-my-gray-900 text-gray-900">{label}</label>
         <input
            {...register(props.name || '')}
            {...props}
            className="rounded-md border-2 border-gray-100 dark:border-my-gray-300 p-2 text-gray-900 outline-none placeholder:text-gray-400 dark:text-my-gray-900 placeholder:dark:text-my-gray-900"
         />
         {errors?.[props.name || ''] && (
            <p className="select-none text-sm text-red-600">
               {errors?.[props.name || '']?.message?.toString()}
            </p>
         )}
      </fieldset>
   )
}

export default TextField
