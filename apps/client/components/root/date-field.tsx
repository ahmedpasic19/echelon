import React from 'react'

import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useFormContext } from 'react-hook-form'

interface TProps {
   name: string
   label: string
   placeholder?: string
   // eslint-disable-next-line
   onChange?: (date: Date) => void
}

const DateField = ({ label, onChange, ...props }: TProps) => {
   const {
      control,
      formState: { errors },
      setValue,
      watch,
   } = useFormContext()

   const date = watch(props.name)

   return (
      <fieldset className="flex w-full flex-col">
         <label className="font-semibold dark:text-my-gray-900 text-gray-900">{label}</label>
         <Controller
            name={props.name!}
            control={control}
            rules={{
               required: true,
            }}
            render={({ field }) => (
               <ReactDatePicker
                  {...field}
                  selected={date ? new Date(date) : null}
                  onChange={
                     onChange
                        ? onChange
                        : (date: Date) => {
                             setValue(props.name, date)
                          }
                  }
                  ref={(ref) => {
                     field.ref({
                        focus: ref?.setFocus,
                     })
                  }}
                  placeholderText={props.placeholder ? props.placeholder : 'Choose date'}
                  dateFormat="dd.MM.yyyy"
                  autoComplete="off"
                  className="rounded-md outline-none p-2 border-2 border-gray-100 dark:border-my-gray-300 dark:text-my-gray-900 placeholder:dark:text-my-gray-900 w-full"
               />
            )}
         />
         {errors?.[props.name || ''] && (
            <p className="select-none text-sm text-red-600">
               {errors?.[props.name || '']?.message?.toString()}
            </p>
         )}
      </fieldset>
   )
}

export default DateField
