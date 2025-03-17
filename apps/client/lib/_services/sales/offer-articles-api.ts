import { api } from '..'

import { OfferArticle } from '@/schemas/sales/offer-articles/offer-article.interface'
import {
   createOfferArticleSchema,
   updateOffeerArticleSchema,
} from '@/schemas/sales/offer-articles/offer-article.schema'

export const offerArticleApi = api.injectEndpoints({
   endpoints: (builder) => ({
      createOfferArticle: builder.mutation<
         { message: string; offer_article: OfferArticle },
         { body: createOfferArticleSchema }
      >({
         query: ({ body }) => ({
            url: `/offer-articles`,
            method: 'POST',
            body,
         }),
         invalidatesTags: (res) => [
            'OfferArticle',
            { type: 'Offer', id: res?.offer_article.offers_id },
         ],
      }),
      updateOfferArticle: builder.mutation<
         { message: string; offer_article: OfferArticle },
         { body: updateOffeerArticleSchema }
      >({
         query: ({ body }) => ({
            url: `/offer-articles/${body.id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: (res) => [
            'OfferArticle',
            { type: 'Offer', id: res?.offer_article.offers_id },
         ],
      }),
      deleteOfferArticle: builder.mutation<
         { message: string; offer_article: OfferArticle },
         { id: number }
      >({
         query: ({ id }) => ({
            url: `/offer-articles/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: (res) => [
            'OfferArticle',
            { type: 'Offer', id: res?.offer_article.offers_id },
         ],
      }),
      getOneOfferArticle: builder.query<{ offer_article: OfferArticle }, { id: number }>({
         query: ({ id }) => `/offer-articles/${id}`,
         providesTags: (res) => [{ type: 'OfferArticle', id: res?.offer_article.offers_id }],
      }),
      getAllOfferArticles: builder.query<{ offer_articles: OfferArticle[] }, { offer_id: number }>({
         query: ({ offer_id }) => `/offer-articles/by-offer/${offer_id}`,
         providesTags: (res, err, req) => [{ type: 'OfferArticle', id: req.offer_id }],
      }),
   }),
})

export const {
   useCreateOfferArticleMutation,
   useUpdateOfferArticleMutation,
   useDeleteOfferArticleMutation,
   useGetOneOfferArticleQuery,
   useGetAllOfferArticlesQuery,
} = offerArticleApi
