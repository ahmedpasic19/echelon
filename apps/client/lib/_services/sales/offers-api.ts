import { api } from '..'

import { Offer } from '@/schemas/sales/offers/offer.interface'
import { createOfferSchema, updateOfferSchema } from '@/schemas/sales/offers/offers.schema'

export const offersApi = api.injectEndpoints({
   endpoints: (builder) => ({
      createOffer: builder.mutation<{ message: string; offer: Offer }, { body: createOfferSchema }>(
         {
            query: ({ body }) => ({
               url: `/offers`,
               method: 'POST',
               body,
            }),
            invalidatesTags: ['Offer'],
         },
      ),
      updateOffer: builder.mutation<{ message: string; offer: Offer }, { body: updateOfferSchema }>(
         {
            query: ({ body }) => ({
               url: `/offers/${body.id}`,
               method: 'PUT',
               body,
            }),
            invalidatesTags: ['Offer'],
         },
      ),
      deleteOffer: builder.mutation<{ message: string; offer: Offer }, { id: number }>({
         query: ({ id }) => ({
            url: `/offers/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Offer'],
      }),
      getOneOffer: builder.query<{ offer: Offer }, { id: number }>({
         query: ({ id }) => `/offers/${id}`,
         providesTags: (req, err, res) => [{ type: 'Offer', id: res.id }],
      }),
      getAllCompaniesOffers: builder.query<{ offers: Offer[] }, { id: number }>({
         query: ({ id }) => `/offers/by-company/${id}`,
         providesTags: ['Offer'],
      }),
   }),
})

export const {
   useCreateOfferMutation,
   useUpdateOfferMutation,
   useDeleteOfferMutation,
   useGetOneOfferQuery,
   useGetAllCompaniesOffersQuery,
} = offersApi
