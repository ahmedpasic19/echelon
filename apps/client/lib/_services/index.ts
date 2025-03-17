import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { env } from '@/env/client.mjs'

export const api = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: `${env.NEXT_PUBLIC_BASEAPI}/api`,
   }),
   endpoints: () => ({}),
   tagTypes: ['Company', 'User', 'Article', 'Storage', 'Offer', 'OfferArticle', 'Currency'],
})
