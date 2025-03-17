'use client'

import React, { memo } from 'react'

import { GroupBase, OptionsOrGroups } from 'react-select'
import { AsyncProps } from 'react-select/async'

import SearchSelectField from '../root/search-select-field'

import { useLazyGetCompaniesClientsByNameQuery } from '@/lib/_services/basic/users-api'
import { User } from '@/schemas/basic/users/users.interface'
import { debounce } from '@/utils/common'

type TProps<
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
> = AsyncProps<Option, IsMulti, Group> & {
   label: string
   companyId: number
   nameOption?: string
}

const ClientSearchSelect = <
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
>({
   label,
   companyId,
   nameOption,
   ...props
}: TProps<Option, IsMulti, Group>) => {
   const [getClientsByName] = useLazyGetCompaniesClientsByNameQuery()

   const getData = debounce(
      async (
         inputValue: string,
         // eslint-disable-next-line
         callback: (options: OptionsOrGroups<User, GroupBase<User>>) => void,
      ) => {
         try {
            const data = await getClientsByName({
               companies_id: companyId,
               name: inputValue?.length ? inputValue : 'ANY_CLIENTS',
            }).unwrap()

            callback(data.clients)
         } catch (error) {
            // @ts-expect-error // ignore error type
            toast.error(error.data.message)
         }
      },
      500,
   )

   return (
      <SearchSelectField
         {...props}
         label={label ?? 'Client'}
         // @ts-expect-error // User as Option type
         loadOptions={getData}
         defaultOptions
         getOptionLabel={(option: User) => option.name}
         getOptionValue={(option: User) => option.id}
         nameOption={nameOption}
      />
   )
}

export default memo(ClientSearchSelect)
