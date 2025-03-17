'use client'

import React from 'react'

import { useTheme } from 'next-themes'
import { Controller, useFormContext } from 'react-hook-form'
import { GroupBase } from 'react-select'
import AsyncSelect, { AsyncProps } from 'react-select/async'

type TProps<
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
> = AsyncProps<Option, IsMulti, Group> & {
   label: string
   nameOption?: string
}

const SearchSelectField = <
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
>({
   label,
   nameOption,
   ...props
}: TProps<Option, IsMulti, Group>) => {
   const {
      control,
      formState: { errors },
   } = useFormContext()

   const { resolvedTheme } = useTheme()

   const isDarkMode = resolvedTheme === 'dark'

   return (
      <fieldset>
         <label className="font-semibold dark:text-my-gray-900 text-gray-900 ">{label}</label>
         <Controller
            name={props.name!}
            control={control}
            render={({ field }) => (
               <AsyncSelect
                  {...field}
                  {...props}
                  styles={{
                     control: (provided) => ({
                        ...provided,
                        borderRadius: '4px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        border: 0,
                        height: 44,
                        backgroundColor: isDarkMode ? '#3B3B3B' : 'whitesmoke',
                     }),
                     option: (provided, state) => ({
                        ...provided,
                        backgroundColor: isDarkMode
                           ? state.isSelected || state.isFocused
                              ? '#2B2B2B'
                              : '#3B3B3B'
                           : state.isSelected || state.isFocused
                           ? 'gray'
                           : 'white',
                        color: isDarkMode
                           ? state.isSelected || state.isFocused
                              ? 'white'
                              : '#9B9B9B'
                           : state.isSelected || state.isFocused
                           ? 'white'
                           : '#333',
                     }),
                     singleValue: (provided) => ({
                        ...provided,
                        color: isDarkMode ? '#9B9B9B' : 'black',
                     }),
                     placeholder: (base) => ({
                        ...base,
                        color: '#9B9B9B',
                     }),
                     menu: (provided) => ({
                        ...provided,
                        backgroundColor: isDarkMode ? '3B3B3B' : 'white',
                     }),
                  }}
                  value={
                     !props.isMulti && nameOption
                        ? { label: nameOption, value: field.value }
                        : props.isMulti && nameOption
                        ? nameOption
                        : null
                  }
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

export default SearchSelectField
