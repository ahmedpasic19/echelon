import { api } from '..'

import { Currency } from '@/schemas/sales/currencies/currencies.interface'

export const currnciesApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getAllCurrencies: builder.query<{ currencies: Currency[] }, void>({
         query: () => `/currencies`,
         providesTags: ['Currency'],
      }),
   }),
})

export const { useGetAllCurrenciesQuery } = currnciesApi
