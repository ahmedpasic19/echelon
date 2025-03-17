import React from 'react'

import { GroupBase, Props } from 'react-select'

import SelectField from '../root/select-field'

import { useGetAllCurrenciesQuery } from '@/lib/_services/sales/currencies-api'

type TProps<
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
   label: string
   nameOption?: string
}

const CurrenciesSelect = <
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
>({
   label,
   nameOption,
   ...props
}: TProps<Option, IsMulti, Group>) => {
   const { data } = useGetAllCurrenciesQuery()

   const currency_options = data?.currencies.map((cur) => ({
      label: cur.name,
      value: cur.id,
   }))

   return (
      <SelectField
         label={label ?? 'Currency'}
         {...props}
         options={currency_options}
         nameOption={nameOption}
      />
   )
}

export default CurrenciesSelect
